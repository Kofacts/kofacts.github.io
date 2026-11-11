import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchRSSPosts } from '@/utils/rss';
import { ScrollProgressBehavior } from '@/components/ClientBehaviors';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 900; // 15 minutes ISR

function extractFirstImage(htmlContent: string): string | null {
  if (!htmlContent) return null;
  const imgMatch = htmlContent.match(/<img[^>]+src="([^"]+)"/i);
  return imgMatch ? imgMatch[1] : null;
}

export async function generateStaticParams() {
  const posts = await fetchRSSPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const posts = await fetchRSSPosts();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const image = extractFirstImage(post.content) || 'https://obodugo.online/ogmeta.png';
  const description = post.description || post.title;

  return {
    title: `${post.title} · Rapheal Obodugo`,
    description,
    alternates: {
      canonical: `https://obodugo.online/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${post.title} · Rapheal Obodugo`,
      description,
      url: `https://obodugo.online/blog/${post.slug}`,
      images: [image],
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} · Rapheal Obodugo`,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const posts = await fetchRSSPosts();
  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[currentIndex];

  if (!post) {
    notFound();
  }

  const nextPost = posts[currentIndex + 1] || null;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const wordCount = (post.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  const image = extractFirstImage(post.content) || 'https://obodugo.online/ogmeta.png';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    author: {
      '@type': 'Person',
      name: 'Rapheal Obodugo',
      url: 'https://obodugo.online',
    },
    datePublished: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://obodugo.online/blog/${post.slug}`,
    },
    image,
    description: post.description || post.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="scroll-progress" id="scrollProgress"></div>

      <main className="page-blog-post taste-revamp">
        <div className="post-top-nav">
          <Link href="/" className="profile-link">
            <span className="back-arrow">←</span>
            <img src="/ajabruwal.png" alt="" className="mini-avatar" />
            <span className="mini-name">Rapheal Obodugo</span>
          </Link>
          <Link href="/blog" className="archive-crumb">
            Essays
          </Link>
        </div>

        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time className="meta-item">{formatDate(post.date)}</time>
            <span className="meta-sep">·</span>
            <span className="meta-item">{minutes} min read</span>
            {wordCount > 0 && (
              <>
                <span className="meta-sep">·</span>
                <span className="meta-item">~{wordCount.toLocaleString()} words</span>
              </>
            )}
            <span className="meta-sep">·</span>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-substack-link"
            >
              Substack ↗
            </a>
          </div>
        </header>

        <article className="post-body">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>Preview. Full post on Substack.</p>
          )}
        </article>

        <footer className="post-footer">
          <div className="substack-cta">
            <div className="cta-copy">
              <span className="cta-kicker">ESSAY CORRESPONDENCE</span>
              <p className="cta-text">Comments, discourse, and revisions are hosted on Substack.</p>
            </div>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="substack-button"
            >
              Discuss on Substack <span className="arrow">↗</span>
            </a>
          </div>

          {nextPost && (
            <div className="next-essay-card">
              <span className="next-kicker">READ NEXT IN ARCHIVE</span>
              <Link href={`/blog/${nextPost.slug}/`} className="next-link">
                <div className="next-info">
                  <h3 className="next-title">{nextPost.title}</h3>
                  <span className="next-meta">
                    {nextPost.date ? new Date(nextPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''} · Read essay →
                  </span>
                </div>
              </Link>
            </div>
          )}

          <nav className="footer-navigation">
            <Link href="/blog" className="nav-back">
              ← All essays
            </Link>
            <Link href="/" className="nav-home">
              Home
            </Link>
          </nav>
        </footer>
      </main>

      <ScrollProgressBehavior />
    </>
  );
}
