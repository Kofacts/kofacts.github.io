import { slugify } from './slugify';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

export interface Post {
  title: string;
  link: string;
  date: string;
  slug: string;
  description: string;
  content: string;
}

const SUBSTACK_URL = 'https://obodugo.substack.com/feed';
const COMMITTED_FEED = join(process.cwd(), 'src/data/substack-feed.xml');

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

export async function fetchRSSPosts(): Promise<Post[]> {
  // 1. Try direct Substack fetch (cached & revalidated every 15 minutes via Next.js Data Cache)
  try {
    const response = await fetch(SUBSTACK_URL, {
      headers: { 'User-Agent': BROWSER_UA },
      next: { revalidate: 900, tags: ['substack'] },
    });

    if (response.ok) {
      const xml = await response.text();
      if (xml.includes('<item>')) {
        const posts = parseXml(xml);
        if (posts.length > 0) {
          return posts;
        }
      }
    }
  } catch (err) {
    console.warn('[RSS] Direct Substack fetch failed, using fallback snapshot:', (err as Error).message);
  }

  // 2. Fallback: committed XML feed snapshot so site never renders 0 essays
  if (existsSync(COMMITTED_FEED)) {
    return parseXml(readFileSync(COMMITTED_FEED, 'utf-8'));
  }

  return [];
}

function parseXml(xml: string): Post[] {
  const posts: Post[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const getTag = (tag: string) => {
      const regex = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`);
      const m = item.match(regex);
      return m ? m[1].trim() : '';
    };

    const title = getTag('title');
    if (!title) continue;

    posts.push({
      title,
      link: getTag('link'),
      date: getTag('pubDate'),
      slug: slugify(title),
      description: getTag('description'),
      content: getTag('content:encoded'),
    });
  }

  return posts;
}
