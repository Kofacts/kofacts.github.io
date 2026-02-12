import { slugify } from './slugify.js';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const RSS_URL = 'https://obodugo.substack.com/feed';
const LOCAL_FEED = '/tmp/substack-feed.xml';
const __dirname = dirname(fileURLToPath(import.meta.url));
const COMMITTED_FEED = join(__dirname, '../data/substack-feed.xml');

function loadFeed() {
  // 1. Try fresh pre-fetched copy (from local prebuild curl)
  if (existsSync(LOCAL_FEED)) {
    const content = readFileSync(LOCAL_FEED, 'utf-8');
    if (content.includes('<item>')) {
      console.log('[RSS] Using pre-fetched feed from', LOCAL_FEED);
      return content;
    }
    console.log('[RSS] Pre-fetched feed is invalid, trying committed copy...');
  }

  // 2. Fall back to committed copy in repo (always works on CI)
  if (existsSync(COMMITTED_FEED)) {
    console.log('[RSS] Using committed feed from repo');
    return readFileSync(COMMITTED_FEED, 'utf-8');
  }

  return null;
}

export async function fetchRSSPosts() {
  let xml = loadFeed();

  if (!xml) {
    console.log('[RSS] Fetching fresh data from Substack...');
    const response = await fetch(RSS_URL, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; StaticSiteGenerator/1.0)' },
    });
    xml = await response.text();
  }

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
