import { slugify } from './slugify.js';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const SUBSTACK_URL = 'https://obodugo.substack.com/feed';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_URL)}`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const COMMITTED_FEED = join(__dirname, '../data/substack-feed.xml');

const BROWSER_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

export async function fetchRSSPosts() {
  // 1. Try direct Substack fetch (freshest data, works locally + most CI)
  try {
    console.log('[RSS] Fetching directly from Substack...');
    const response = await fetch(SUBSTACK_URL, {
      headers: { 'User-Agent': BROWSER_UA },
    });
    const xml = await response.text();

    if (xml.includes('<item>')) {
      const posts = parseXml(xml);
      console.log(`[RSS] Got ${posts.length} posts from Substack`);
      return posts;
    }
    console.log('[RSS] Direct fetch returned non-RSS response');
  } catch (err) {
    console.log('[RSS] Direct fetch failed:', err.message);
  }

  // 2. Try rss2json proxy (works when Substack blocks the IP)
  try {
    console.log('[RSS] Trying rss2json proxy...');
    const response = await fetch(RSS2JSON_URL);
    const data = await response.json();

    if (data.status === 'ok' && data.items?.length > 0) {
      console.log(`[RSS] Got ${data.items.length} posts from rss2json`);
      return data.items.map((item) => ({
        title: item.title,
        link: item.link,
        date: item.pubDate,
        slug: slugify(item.title),
        description: item.description || '',
        content: item.content || '',
      }));
    }
  } catch (err) {
    console.log('[RSS] rss2json failed:', err.message);
  }

  // 3. Last resort: committed XML feed
  console.log('[RSS] Falling back to committed feed...');
  if (existsSync(COMMITTED_FEED)) {
    return parseXml(readFileSync(COMMITTED_FEED, 'utf-8'));
  }

  return [];
}

function parseXml(xml) {
  const posts = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const getTag = (tag) => {
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

