import { fetchRSSPosts } from '../../utils/rss.js';

export async function GET() {
  try {
    const posts = await fetchRSSPosts();

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
