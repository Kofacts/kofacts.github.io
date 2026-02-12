import { slugify } from './slugify.js';
import { existsSync, readFileSync } from 'fs';

const RSS_URL = 'https://obodugo.substack.com/feed';
const LOCAL_FEED = '/tmp/substack-feed.xml';

export async function fetchRSSPosts() {
  let xml;

  // Try local file first (pre-fetched by prebuild script)
  if (existsSync(LOCAL_FEED)) {
    console.log('[RSS] Using pre-fetched feed from', LOCAL_FEED);
    xml = readFileSync(LOCAL_FEED, 'utf-8');
  } else {
    console.log('[RSS] Fetching fresh data from Substack...');
    const response = await fetch(RSS_URL);
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
