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
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    } catch {
      return '';
    }
  };

  const getReadingTime = (content: string) => {
    if (!content) return '2 min';
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

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

      <main className="page-blog-post">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>

        <header>
          <h1>{post.title}</h1>
          <div className="meta">
            <span>{formatDate(post.date)}</span>
            <span className="sep">·</span>
            <span>{getReadingTime(post.content || '')}</span>
          </div>
        </header>

        <article>
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>Preview. Full post on Substack.</p>
          )}
        </article>

        <footer>
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="substack">
            Read on Substack ↗
          </a>
          <nav>
            <Link href="/blog">← All essays</Link>
            <Link href="/">Home</Link>
          </nav>
        </footer>
      </main>

      <ScrollProgressBehavior />
    </>
  );
}
