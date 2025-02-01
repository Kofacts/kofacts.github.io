import { parseStringPromise } from 'xml2js';

export async function GET() {
  try {
    const rssUrl = 'https://obodugo.substack.com/feed'; // Change to your Substack feed
    const response = await fetch(rssUrl);
    const xml = await response.text();
    const json = await parseStringPromise(xml);

    const posts = json.rss.channel[0].item.map((item) => ({
      title: item.title[0],
      link: item.link[0],
      date: item.pubDate[0],
      description: item.description ? item.description[0] : '',
    }));

    return new Response(JSON.stringify(posts), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch RSS feed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
