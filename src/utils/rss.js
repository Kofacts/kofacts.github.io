import { parseStringPromise } from 'xml2js';
import { slugify } from './slugify.js';
import { existsSync, readFileSync } from 'fs';

const RSS_URL = 'https://obodugo.substack.com/feed';
const LOCAL_FEED = '/tmp/substack-feed.xml';

export async function fetchRSSPosts() {
  let xml;

  // Try local file first (pre-fetched)
  if (existsSync(LOCAL_FEED)) {
    console.log('[RSS] Using pre-fetched feed from', LOCAL_FEED);
    xml = readFileSync(LOCAL_FEED, 'utf-8');
  } else {
    console.log('[RSS] Fetching fresh data from Substack...');
    const response = await fetch(RSS_URL);
    xml = await response.text();
  }

  const json = await parseStringPromise(xml, { strict: false, normalizeTags: true });

  const posts = json.rss.channel[0].item.map((item) => ({
    title: item.title[0],
    link: item.link[0],
    date: item.pubdate[0],
    slug: slugify(item.title[0]),
    description: item.description ? item.description[0] : '',
    content: item['content:encoded'] ? item['content:encoded'][0] : '',
  }));

  return posts;
}

