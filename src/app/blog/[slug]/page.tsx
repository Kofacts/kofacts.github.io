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
    return { title: 'Post Not Found' };
  }

  const image = extractFirstImage(post.content) || 'https://obodugo.online/ogmeta.png';
  const description = post.description || post.title;

  return {
    title: `${post.title} · Rapheal Obodugo`,
    description,
    alternates: { canonical: `https://obodugo.online/blog/${post.slug}` },
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
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

  const fmtDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const shortDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
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
    author: { '@type': 'Person', name: 'Rapheal Obodugo', url: 'https://obodugo.online' },
    datePublished: post.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://obodugo.online/blog/${post.slug}` },
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

      <main className="tf tf-essay">
        {/* ---- broadsheet header ---- */}
        <header className="tf-essay-head">
          <nav className="tf-essay-nav">
            <Link href="/">Rapheal Obodugo</Link>
            <span className="tf-dim">/</span>
            <Link href="/blog">Writing</Link>
          </nav>

          <div className="tf-essay-headline">
            <aside className="tf-essay-dateline">
              <time>{fmtDate(post.date)}</time>
              <span>{minutes} min read</span>
              <span>{wordCount.toLocaleString()} words</span>
            </aside>
            <div>
              <h1 className="tf-essay-title">{post.title}</h1>
              {post.description && (
                <p className="tf-essay-dek">
                  {post.description.replace(/<[^>]*>/g, '').slice(0, 200)}
                </p>
              )}
            </div>
          </div>
        </header>

        {/* ---- article body ---- */}
        <article className="tf-essay-body tf-dropcap">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>Preview only. <a href={post.link}>Full essay on Substack</a>.</p>
          )}
        </article>

        {/* ---- article footer ---- */}
        <footer className="tf-essay-foot">
          <div className="tf-essay-colophon">
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              Discuss on Substack ↗
            </a>
          </div>

          {(prevPost || nextPost) && (
            <nav className="tf-essay-siblings">
              {prevPost && (
                <Link href={`/blog/${prevPost.slug}/`} className="tf-essay-sib tf-essay-sib-prev">
                  <span className="tf-essay-sib-label">Previously</span>
                  <span className="tf-essay-sib-title">{prevPost.title}</span>
                  <span className="tf-essay-sib-date">{shortDate(prevPost.date)}</span>
                </Link>
              )}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}/`} className="tf-essay-sib tf-essay-sib-next">
                  <span className="tf-essay-sib-label">Next</span>
                  <span className="tf-essay-sib-title">{nextPost.title}</span>
                  <span className="tf-essay-sib-date">{shortDate(nextPost.date)}</span>
                </Link>
              )}
            </nav>
          )}

          <nav className="tf-essay-endnav">
            <Link href="/blog">← All essays</Link>
            <Link href="/">Home</Link>
          </nav>
        </footer>
      </main>

      <ScrollProgressBehavior />
    </>
  );
}
