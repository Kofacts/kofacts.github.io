import { fetchRSSPosts } from '@/utils/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const revalidate = 900;

export async function GET() {
  const posts = await fetchRSSPosts();

  const escapeXml = (unsafe: string) => {
    return (unsafe || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const itemsXml = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://obodugo.online/blog/${post.slug}/</link>
      <guid isPermaLink="true">https://obodugo.online/blog/${post.slug}/</guid>
      <description>${escapeXml(post.description || post.title)}</description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : ''}</pubDate>
    </item>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>https://obodugo.online/</link>
${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=900, stale-while-revalidate',
    },
  });
}
