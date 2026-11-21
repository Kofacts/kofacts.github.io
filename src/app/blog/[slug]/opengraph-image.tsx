import { generateOGCard, OG_SIZE } from '@/utils/og';
import { fetchRSSPosts } from '@/utils/rss';

export const alt = 'Essay · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await fetchRSSPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return generateOGCard({
      page: 'essay',
      title: 'Essay',
      url: 'obodugo.online/blog',
    });
  }

  // Create a short description from the post description
  const desc = post.description
    ? post.description.replace(/<[^>]*>/g, '').slice(0, 120).trim()
    : undefined;

  return generateOGCard({
    page: 'essay',
    title: post.title,
    subtitle: desc,
    url: `obodugo.online/blog/${slug}`,
  });
}
