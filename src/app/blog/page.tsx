import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import { BlogArchive } from '@/components/BlogArchive';
import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const metadata: Metadata = {
  title: 'Essays · Rapheal Obodugo',
  description: 'Essays on autonomous systems, financial verification, artificial intelligence, epistemology, and literature.',
  alternates: {
    canonical: 'https://obodugo.online/blog',
  },
  openGraph: {
    title: `Essays · ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    url: 'https://obodugo.online/blog',
  },
};

export const revalidate = 900; // 15 minutes ISR

export default async function BlogIndexPage() {
  const posts = await fetchRSSPosts();

  return (
    <main className="page-blog-index taste-revamp">
      <Link href="/" className="profile-link">
        <span className="back-arrow">←</span>
        <img src="/ajabruwal.png" alt="" className="mini-avatar" />
        <span className="mini-name">Rapheal Obodugo</span>
      </Link>

      <header className="blog-hero">
        <h1 className="hero-heading">Essays</h1>
        <p className="hero-subheading">
          Inquiries on autonomous agents, epistemological verification, literature, and building.
        </p>
      </header>

      <BlogArchive posts={posts} />

      <footer className="blog-footer">
        <div className="footer-left">
          <span>All thoughts are my own.</span>
          <span className="footer-sep">·</span>
          <a
            href="https://obodugo.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Substack ↗
          </a>
          <span className="footer-sep">·</span>
          <a href="/rss.xml" className="footer-link">
            RSS
          </a>
        </div>
        <div className="footer-right">
          <Link href="/" className="footer-link">
            Home
          </Link>
        </div>
      </footer>
    </main>
  );
}
