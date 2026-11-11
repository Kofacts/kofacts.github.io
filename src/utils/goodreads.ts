import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface Book {
  id: string;
  title: string;
  author: string;
  link: string;
  imageUrl: string;
  rating: number;
  shelf: 'currently-reading' | 'read';
  dateRead?: string | null;
  dateAdded?: string | null;
}

interface SeedData {
  currentlyReading: Book[];
  read: Book[];
}

const GOODREADS_USER_ID = '183340682';
const PROFILE_URL = `https://www.goodreads.com/user/show/${GOODREADS_USER_ID}`;
const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const RATING_TEXT_MAP: Record<string, number> = {
  'it was amazing': 5,
  'really liked it': 4,
  'liked it': 3,
  'it was ok': 2,
  'did not like it': 1,
};

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

function upgradeGoodreadsCover(url: string): string {
  if (!url) return '';
  return url.replace(/\._S[XY]\d+(?:_S[XY]\d+)?_\./, '._SY475_.');
}

function loadSeedData(): SeedData {
  try {
    const seedPath = join(process.cwd(), 'src/data/books-seed.json');
    if (existsSync(seedPath)) {
      return JSON.parse(readFileSync(seedPath, 'utf-8')) as SeedData;
    }
  } catch (err) {
    console.error('[Goodreads] Error reading books-seed.json:', err);
  }
  return { currentlyReading: [], read: [] };
}

/**
 * Fetches live "Currently Reading" books from the public Goodreads profile page.
 * Falls back to the seed data only if Goodreads is unreachable or blocks the request.
 */
export async function fetchGoodreadsCurrentlyReading(): Promise<Book[]> {
  const seed = loadSeedData();

  try {
    const res = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 1800, tags: ['goodreads'] },
    });

    if (!res.ok) {
      throw new Error(`Goodreads profile returned HTTP ${res.status}`);
    }

    const html = await res.text();
    const blockMatch = html.match(/id="currentlyReadingReviews"([\s\S]*?)<div class="bigBoxBottom">/);

    if (!blockMatch) {
      // If user has 0 books currently reading, shelf count says currently-reading (0)
      if (/shelf=currently-reading[\s\S]{0,120}\(0\)/.test(html)) {
        return [];
      }
      throw new Error('Could not locate #currentlyReadingReviews on Goodreads profile');
    }

    const block = blockMatch[1];
    const updates = block.split(/<div class="Updates[^>]*>/).slice(1);
    const liveBooks: Book[] = [];

    for (const u of updates) {
      const titleMatch = u.match(/<a class="bookTitle" href="([^"]+)">([\s\S]*?)<\/a>/);
      const authorMatch = u.match(/<a class="authorName" href="[^"]+">([\s\S]*?)<\/a>/);
      const imgMatch = u.match(/<img[^>]+src="(https:\/\/[^"]+)"/);
      const idMatch = titleMatch?.[1]?.match(/\/book\/show\/(\d+)/);

      if (!titleMatch) continue;

      const id = idMatch ? idMatch[1] : titleMatch[1];
      const seedMatch =
        seed.currentlyReading.find((b) => b.id === id) ||
        seed.read.find((b) => b.id === id);

      const rawImg = imgMatch ? imgMatch[1] : seedMatch?.imageUrl || '';

      liveBooks.push({
        id,
        title: decodeEntities(titleMatch[2]),
        author: authorMatch ? decodeEntities(authorMatch[1]) : seedMatch?.author || '',
        link: `https://www.goodreads.com${titleMatch[1]}`,
        imageUrl: upgradeGoodreadsCover(rawImg),
        rating: 0,
        shelf: 'currently-reading',
      });
    }

    if (liveBooks.length > 0) {
      return liveBooks;
    }
  } catch (err) {
    console.warn('[Goodreads] Live currently-reading fetch failed, using seed fallback:', (err as Error).message);
  }

  return seed.currentlyReading;
}

/**
 * Fetches all read books: merges the complete CSV seed library with any newly finished books
 * discovered on Goodreads' public "Year in Books" page for the current year.
 */
export async function fetchGoodreadsReadBooks(): Promise<Book[]> {
  const seed = loadSeedData();
  const seedById = new Map<string, Book>();
  for (const b of seed.read) {
    seedById.set(b.id, b);
  }

  const currentYear = new Date().getFullYear();
  const yibUrl = `https://www.goodreads.com/user/year_in_books/${currentYear}/${GOODREADS_USER_ID}`;

  try {
    const res = await fetch(yibUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 1800, tags: ['goodreads'] },
    });

    if (res.ok) {
      const html = await res.text();
      const pattern =
        /data-resource-id=['"](\d+)['"][^>]*>\s*<a href="(\/book\/show\/[^"]+)"><img alt="([^"]+)"[^>]*src="([^"]+)"\s*\/><\/a>\s*<\/div>\s*(?:<div class=['"](?:double)?[Cc]overStars['"]>\s*<span class="[^"]*staticStars[^"]*"\s*title="([^"]+)")?/g;

      const discoveredNew: Book[] = [];
      const seen = new Set<string>();
      let match: RegExpExecArray | null;

      while ((match = pattern.exec(html)) !== null) {
        const [, id, href, rawAlt, rawImg, ratingTitle] = match;
        if (seen.has(id)) continue;
        seen.add(id);

        const existing = seedById.get(id);
        if (existing) {
          // If seed had a non-Goodreads fallback image, upgrade it with the official Goodreads cover
          if (!existing.imageUrl.includes('gr-assets.com') && rawImg.includes('gr-assets.com')) {
            existing.imageUrl = upgradeGoodreadsCover(rawImg);
          }
          continue;
        }

        const alt = decodeEntities(rawAlt);
        const byIdx = alt.lastIndexOf(' by ');
        const title = byIdx !== -1 ? alt.slice(0, byIdx).trim() : alt;
        const author = byIdx !== -1 ? alt.slice(byIdx + 4).trim() : '';
        const rating = RATING_TEXT_MAP[(ratingTitle || '').trim().toLowerCase()] || 0;

        discoveredNew.push({
          id,
          title,
          author,
          link: `https://www.goodreads.com${href}`,
          imageUrl: upgradeGoodreadsCover(rawImg),
          rating,
          shelf: 'read',
        });
      }

      // Year in Books lists books chronologically (Jan -> Dec); newest finished books are at the end
      if (discoveredNew.length > 0) {
        return [...discoveredNew.reverse(), ...seed.read];
      }
    }
  } catch (err) {
    console.warn('[Goodreads] Live Year in Books sync failed, using seed library:', (err as Error).message);
  }

  return seed.read;
}
