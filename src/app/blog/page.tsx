import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const metadata: Metadata = {
  title: 'Writing',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: 'https://obodugo.online/blog',
  },
  openGraph: {
    title: `Writing · ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    url: 'https://obodugo.online/blog',
  },
};

export const revalidate = 900; // 15 minutes ISR

export default async function BlogIndexPage() {
  const posts = await fetchRSSPosts();

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  return (
    <main className="page-blog-index">
      <Link href="/" className="profile-link">
        <span className="back-arrow">←</span>
        <img src="/ajabruwal.png" alt="" className="mini-avatar" />
        <span className="mini-name">Rapheal Obodugo</span>
      </Link>

      <header>
        <h1>Essays</h1>
        <p className="subtitle">{posts.length} essays</p>
      </header>

      <ul className="posts">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}/`} className="post">
              <span className="title">{post.title}</span>
              <time>{formatDate(post.date)}</time>
            </Link>
          </li>
        ))}
      </ul>

      <footer>All thoughts are my own</footer>
    </main>
  );
}
