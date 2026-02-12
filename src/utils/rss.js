import { slugify } from './slugify.js';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const SUBSTACK_URL = 'https://obodugo.substack.com/feed';
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(SUBSTACK_URL)}`;
const __dirname = dirname(fileURLToPath(import.meta.url));
const COMMITTED_FEED = join(__dirname, '../data/substack-feed.xml');

export async function fetchRSSPosts() {
  // 1. Try rss2json API (works from any IP, including GitHub CI)
  try {
    console.log('[RSS] Fetching via rss2json proxy...');
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

  // 2. Fallback: parse committed XML feed
  console.log('[RSS] Falling back to committed feed...');
  return parseXmlFeed(COMMITTED_FEED);
}

function parseXmlFeed(filePath) {
  if (!existsSync(filePath)) return [];

  const xml = readFileSync(filePath, 'utf-8');
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

