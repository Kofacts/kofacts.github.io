import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import { HomeClientBehavior } from '@/components/ClientBehaviors';
import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'profile',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://obodugo.online/',
    images: ['https://obodugo.online/ogmeta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['https://obodugo.online/ogmeta.png'],
  },
};

export const revalidate = 900; // 15 minutes ISR

export default async function HomePage() {
  const allPosts = await fetchRSSPosts();
  const essays = allPosts.slice(0, 5);
  const currentlyReading = await fetchGoodreadsCurrentlyReading();

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rapheal Obodugo',
    url: 'https://obodugo.online',
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization', name: 'Avae', url: 'https://avae.ai' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="scroll-progress" id="scrollProgress"></div>

      <div className="sticky-header" id="stickyHeader">
        <div className="sticky-inner">
          <img src="/ajabruwal.png" alt="" className="sticky-avatar" />
          <span className="sticky-name">Rapheal Obodugo</span>
          <span className="sticky-spacer"></span>
          <span className="sticky-time" id="londonTime"></span>
        </div>
      </div>

      <main className="page-home">
        <header className="animate-section" style={{ ['--delay' as any]: 0 }}>
          <img src="/ajabruwal.png" alt="" className="avatar" />
          <h1>Rapheal Obodugo</h1>
          <p className="role">
            Founder of{' '}
            <a href="https://avae.ai" target="_blank" rel="noopener noreferrer">
              Avae
            </a>
          </p>
        </header>

        <section className="about animate-section" style={{ ['--delay' as any]: 1 }}>
          <p>
            I am building{' '}
            <a href="https://avae.ai" target="_blank" rel="noopener noreferrer">
              Avae
            </a>
            , an applied research and engineering company focused on continuous audit for modern finance.
            We build systems that can reliably reason over financial data, ensuring that numbers are not merely available, but verifiably correct.
          </p>
          <p>
            Modern financial workflows still rely heavily on manual reconciliation, disparate spreadsheets, and brittle logic.
            As these systems scale, ensuring absolute correctness becomes increasingly difficult. Avae exists to solve this problem at its root by building deterministic systems capable of processing large-scale financial data, detecting structural inconsistencies, and explaining outcomes with absolute precision.
          </p>
          <p>
            Prior to this, I built and exited{' '}
            <a href="https://mysub.africa" target="_blank" rel="noopener noreferrer">
              MySub
            </a>{' '}
            (360k users), led engineering at{' '}
            <a href="https://derayah.com" target="_blank" rel="noopener noreferrer">
              Derayah Finance
            </a>
            , and worked on infrastructure at{' '}
            <a href="https://meta.com" target="_blank" rel="noopener noreferrer">
              Meta
            </a>
            . I am a Stevie Award recipient in the Middle East and Africa programme, recognised for achievement in technology and innovation.
          </p>
          <p>
            I spend a lot of time reading mostly history, philosophy, and biographies. I enjoy understanding how exceptional people thought and why complex systems work the way they do. Occasionally, I turn to fiction when I need the space to escape.
          </p>
          <p>
            I write about the mechanics of building products, the art of execution, and the unique lessons that come from operating in emerging markets.
          </p>
          <p>
            Outside Avae, I'm a director of{' '}
            <a href="https://oriafo.com" target="_blank" rel="noopener noreferrer">
              Oriafo
            </a>
            , a palm kernel processing mill in Abia State, Nigeria.
          </p>
          <p>
            I also advise early-stage startups on product strategy and engineering.{' '}
            <a href="mailto:raph@avae.ai">Get in touch</a> if you are building something genuinely interesting.
          </p>
        </section>

        <section className="writing animate-section" style={{ ['--delay' as any]: 2 }}>
          <h2>Essays</h2>
          {essays.length > 0 && (
            <Link href={`/blog/${essays[0].slug}/`} className="featured">
              <span className="featured-label">Latest</span>
              <span className="featured-title">{essays[0].title}</span>
            </Link>
          )}
          {essays.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="post">
              <span>{post.title}</span>
              <time>{formatDate(post.date)}</time>
            </Link>
          ))}
          <Link href="/blog" className="more">
            All essays →
          </Link>
        </section>

        {currentlyReading.length > 0 && (
          <section className="reading animate-section" style={{ ['--delay' as any]: 3 }}>
            <h2>Currently Reading</h2>
            <div className="books-grid">
              {currentlyReading.map((book) => (
                <a
                  key={book.id || book.title}
                  href={book.link}
                  className="book"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.imageUrl && (
                    <div className="book-cover-wrapper">
                      <img src={book.imageUrl} alt={book.title} className="book-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="book-info">
                    <span className="book-title">{book.title}</span>
                    <span className="book-author">{book.author}</span>
                  </div>
                </a>
              ))}
            </div>
            <Link href="/bookshelf" className="more">
              All books →
            </Link>
          </section>
        )}

        <section className="publications animate-section" style={{ ['--delay' as any]: 4 }}>
          <h2>Research</h2>
          <a
            href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6944801"
            className="post"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span style={{ lineHeight: 1.4 }}>
              Adversarial Consensus Verification for Reliable LLM agents in Financial Forensics: The Pave Interchange Benchmark
            </span>
            <time>2026</time>
          </a>
        </section>

        <section className="speaking animate-section" style={{ ['--delay' as any]: 5 }}>
          <h2>Speaking</h2>
          <div className="videos-list">
            <div className="video">
              <div className="video-thumbnail-wrapper">
                <img
                  src="https://img.youtube.com/vi/V0tF9O2yFJc/maxresdefault.jpg"
                  alt="How AI is reshaping the future of work & skills in Africa"
                  className="video-thumbnail"
                  loading="lazy"
                />
              </div>
              <div className="video-info">
                <span className="video-title">How AI is reshaping the future of work & skills in Africa</span>
                <span className="video-context">CNBC Africa</span>
              </div>
            </div>
            <div className="video">
              <div className="video-thumbnail-wrapper">
                <img
                  src="https://img.youtube.com/vi/psNpGTZlspc/maxresdefault.jpg"
                  alt="The Future of Work: The 9-to-5 and the Gig Economy in the Age of AI"
                  className="video-thumbnail"
                  loading="lazy"
                />
              </div>
              <div className="video-info">
                <span className="video-title">The Future of Work: The 9-to-5 and the Gig Economy in the Age of AI</span>
                <span className="video-context">Panel Discussion</span>
              </div>
            </div>
          </div>
        </section>

        <section className="awards animate-section" style={{ ['--delay' as any]: 6 }}>
          <h2>Awards</h2>
          <div className="list-item">
            <span>Stevie Award — Innovation in Science or Technology (MENA)</span>
            <time>2025</time>
          </div>
        </section>

        <section className="links animate-section" style={{ ['--delay' as any]: 7 }}>
          <a href="mailto:raph@avae.ai">Email</a>
          <a href="https://twitter.com/thekofacts" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://linkedin.com/in/obodugo" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://calendar.app.google/JWpSBB15VvwmQUdA8" target="_blank" rel="noopener noreferrer">
            Book a call
          </a>
          <Link href="/photos">Photos</Link>
          <Link href="/stack">Stack</Link>
          <Link href="/now">Now</Link>
        </section>

        <footer className="animate-section" style={{ ['--delay' as any]: 8 }}>
          <span>Lagos · Riyadh · London</span>
          <a href="https://avae.ai" target="_blank" rel="noopener noreferrer" className="avae-credit">
            Built with Avae
          </a>
        </footer>
      </main>

      <div className="grain"></div>
      <HomeClientBehavior />
    </>
  );
}
