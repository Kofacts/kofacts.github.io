import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import { HomeClientBehavior } from '@/components/ClientBehaviors';
import { KineticStatement } from '@/components/KineticStatement';
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

function getReadingTime(content: string, description: string): string {
  const text = (content || description || '').replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

function cleanDescription(desc: string, maxLen = 140): string {
  if (!desc) return '';
  const clean = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + '…';
}

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

  const leadEssay = essays[0];

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

      <main className="page-home taste-master">
        {/* EDITORIAL HERO */}
        <header className="hero-editorial">
          <div className="hero-identity">
            <div className="avatar-frame">
              <img src="/ajabruwal.png" alt="Rapheal Obodugo" className="hero-avatar" />
            </div>
            <div className="hero-titles">
              <h1 className="hero-name">Rapheal Obodugo</h1>
              <p className="hero-byline">
                Founder of{' '}
                <a href="https://avae.ai" target="_blank" rel="noopener noreferrer" className="hero-link">
                  Avae
                </a>
                . Building continuous audit and deterministic verification for autonomous systems in modern finance.
              </p>
            </div>
          </div>

          <div className="hero-meta-strip">
            <span className="meta-loc">Lagos · Riyadh · London</span>
            <span className="meta-sep">/</span>
            <nav className="hero-quick-nav">
              <a href="mailto:raph@avae.ai">raph@avae.ai</a>
              <span className="nav-dot">·</span>
              <a href="https://twitter.com/thekofacts" target="_blank" rel="noopener noreferrer">
                Twitter ↗
              </a>
              <span className="nav-dot">·</span>
              <a href="https://calendar.app.google/JWpSBB15VvwmQUdA8" target="_blank" rel="noopener noreferrer">
                Book a call ↗
              </a>
            </nav>
          </div>
        </header>

        {/* DEALT MOMENT: KINETIC STATEMENT (word-highlight) */}
        <section className="statement-section">
          <KineticStatement
            lead="THE THESIS"
            text="Most financial software assumes numbers are correct because an API returned them. We build deterministic multi-agent architectures that prove they are."
          />
        </section>

        {/* PROVENANCE: THE EDITORIAL LEDGER */}
        <section className="ledger-section">
          <h2 className="section-label">Provenance</h2>
          <div className="ledger-rows">
            <div className="ledger-row">
              <div className="ledger-col-time">2026 — Present</div>
              <div className="ledger-col-main">
                <div className="ledger-title-line">
                  <span className="ledger-org">Avae</span>
                  <span className="ledger-role">Founder & Applied Researcher</span>
                </div>
                <p className="ledger-summary">
                  Continuous audit for modern finance. Researching deterministic multi-agent verification architectures that audit 50,000+ transaction batches without hallucination.
                </p>
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-col-time">2024 — 2025</div>
              <div className="ledger-col-main">
                <div className="ledger-title-line">
                  <span className="ledger-org">MySub</span>
                  <span className="ledger-role">Founder · Exited</span>
                </div>
                <p className="ledger-summary">
                  Built consumer recurring payment infrastructure, scaled to 360,000 accounts across emerging markets, and successfully completed acquisition.
                </p>
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-col-time">2022 — 2024</div>
              <div className="ledger-col-main">
                <div className="ledger-title-line">
                  <span className="ledger-org">Derayah Finance</span>
                  <span className="ledger-role">Head of Engineering</span>
                </div>
                <p className="ledger-summary">
                  Led core engineering across digital wealth management, capital market execution engines, and retail investment platforms in Riyadh.
                </p>
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-col-time">2021 — 2022</div>
              <div className="ledger-col-main">
                <div className="ledger-title-line">
                  <span className="ledger-org">Meta</span>
                  <span className="ledger-role">Infrastructure Engineering</span>
                </div>
                <p className="ledger-summary">
                  Distributed systems infrastructure, large-scale data pipelines, and network reliability engineering.
                </p>
              </div>
            </div>

            <div className="ledger-row">
              <div className="ledger-col-time">2026 — Present</div>
              <div className="ledger-col-main">
                <div className="ledger-title-line">
                  <span className="ledger-org">Oriafo</span>
                  <span className="ledger-role">Director</span>
                </div>
                <p className="ledger-summary">
                  A commercial palm kernel processing mill in Bende, Abia State, Nigeria, commissioning industrial processing equipment for vegetable oil production.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RESEARCH PAPER DOSSIER (Academic Artifact) */}
        <section className="research-artifact-section">
          <h2 className="section-label">Selected Research</h2>
          <div className="paper-dossier-card">
            <div className="paper-header">
              <span className="paper-source">SSRN Electronic Preprints · Financial Forensics</span>
              <span className="paper-id">SSRN ID 6944801</span>
            </div>

            <h3 className="paper-heading">
              <a
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6944801"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adversarial Consensus Verification for Reliable LLM agents in Financial Forensics: The Pave Interchange Benchmark
              </a>
            </h3>

            <div className="paper-authors">
              <span>Zacchaeus Bolaji (Harvard)</span>
              <span className="author-sep">·</span>
              <span>Rapheal Obodugo (Avae / Imperial College London)</span>
              <span className="author-sep">·</span>
              <span>John Hella (Imperial / Avae)</span>
            </div>

            <div className="paper-findings">
              <div className="finding-box">
                <span className="finding-title">The Problem</span>
                <p className="finding-text">
                  Single-agent LLMs degrade below 55% accuracy on forensic discovery tasks due to relational blindness, numerical drift, and contextual overload.
                </p>
              </div>
              <div className="finding-box highlight">
                <span className="finding-title">The Benchmark Result</span>
                <p className="finding-text">
                  Avae 2.0 multi-agent adversarial consensus achieves 100% forensic accuracy across all 24 tasks on a 50,000-record payment reconciliation suite.
                </p>
              </div>
            </div>

            <div className="paper-links">
              <a
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6944801"
                target="_blank"
                rel="noopener noreferrer"
                className="paper-btn primary"
              >
                Read preprint on SSRN ↗
              </a>
              <a
                href="https://github.com/avae-ai/pave-benchmark"
                target="_blank"
                rel="noopener noreferrer"
                className="paper-btn secondary"
              >
                Evaluation harness (GitHub) ↗
              </a>
            </div>
          </div>
        </section>

        {/* NARRATIVE & PHILOSOPHY */}
        <section className="narrative-section">
          <h2 className="section-label">Background & Inquiry</h2>
          <div className="narrative-body">
            <p className="lead-text">
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
          </div>
        </section>

        {/* ESSAYS ARCHIVE */}
        <section className="essays-archive-section">
          <div className="section-head-split">
            <h2 className="section-label">Writing & Essays</h2>
            <Link href="/blog" className="view-all-link">
              All {allPosts.length} essays →
            </Link>
          </div>

          {leadEssay && (
            <article className="lead-essay-feature">
              <div className="lead-essay-meta">
                <span className="lead-essay-kicker">Latest Essay</span>
                <span className="lead-essay-date">
                  {formatDate(leadEssay.date)} · {getReadingTime(leadEssay.content, leadEssay.description)}
                </span>
              </div>
              <h3 className="lead-essay-title">
                <Link href={`/blog/${leadEssay.slug}/`}>{leadEssay.title}</Link>
              </h3>
              <p className="lead-essay-teaser">
                {leadEssay.description
                  ? cleanDescription(leadEssay.description, 200)
                  : 'An inquiry into autonomous verification and epistemic safety in multi-agent systems.'}
              </p>
              <Link href={`/blog/${leadEssay.slug}/`} className="lead-essay-read">
                Read essay <span className="arrow">→</span>
              </Link>
            </article>
          )}

          <div className="recent-essays-table">
            {essays.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="essay-table-row">
                <span className="row-title">{post.title}</span>
                <div className="row-right">
                  <span className="row-time">{getReadingTime(post.content, post.description)}</span>
                  <span className="row-sep">·</span>
                  <time className="row-date">{formatDate(post.date)}</time>
                  <span className="row-arrow">↗</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CURRENTLY READING (Physical Visual Artifacts) */}
        {currentlyReading.length > 0 && (
          <section className="bookshelf-section">
            <div className="section-head-split">
              <h2 className="section-label">Currently Reading</h2>
              <Link href="/bookshelf" className="view-all-link">
                Full Bookshelf →
              </Link>
            </div>
            <div className="bookshelf-row">
              {currentlyReading.map((book) => (
                <a
                  key={book.id || book.title}
                  href={book.link}
                  className="book-artifact"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {book.imageUrl && (
                    <div className="book-3d-wrap">
                      <img src={book.imageUrl} alt={book.title} className="book-3d-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="book-details">
                    <span className="book-now-reading">In progress</span>
                    <h4 className="book-name">{book.title}</h4>
                    <span className="book-creator">{book.author}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* SPEAKING & BROADCASTS */}
        <section className="speaking-section">
          <h2 className="section-label">Speaking & Broadcasts</h2>
          <div className="speaking-cards">
            <div className="speaking-item">
              <div className="speaking-media-frame">
                <img
                  src="https://img.youtube.com/vi/V0tF9O2yFJc/maxresdefault.jpg"
                  alt="How AI is reshaping the future of work & skills in Africa"
                  className="speaking-poster"
                  loading="lazy"
                />
                <span className="speaking-stamp">CNBC Africa</span>
              </div>
              <div className="speaking-copy">
                <h4 className="speaking-headline">How AI is reshaping the future of work & skills in Africa</h4>
                <span className="speaking-channel">Broadcast Interview · Africa Market Strategy</span>
              </div>
            </div>

            <div className="speaking-item">
              <div className="speaking-media-frame">
                <img
                  src="https://img.youtube.com/vi/psNpGTZlspc/maxresdefault.jpg"
                  alt="The Future of Work: The 9-to-5 and the Gig Economy in the Age of AI"
                  className="speaking-poster"
                  loading="lazy"
                />
                <span className="speaking-stamp">Panel</span>
              </div>
              <div className="speaking-copy">
                <h4 className="speaking-headline">The Future of Work: The 9-to-5 and the Gig Economy in the Age of AI</h4>
                <span className="speaking-channel">Panel Discussion · Generative Systems</span>
              </div>
            </div>
          </div>
        </section>

        {/* HONORS */}
        <section className="recognition-section">
          <h2 className="section-label">Recognitions</h2>
          <div className="recognition-item">
            <div className="recognition-left">
              <span className="recognition-name">Stevie Award (Gold)</span>
              <span className="recognition-desc">Achievement in Science or Technology (Middle East & Africa)</span>
            </div>
            <time className="recognition-year">2025</time>
          </div>
        </section>

        {/* CHANNELS & DIRECT LINES */}
        <section className="channels-section">
          <h2 className="section-label">Direct Lines & Indices</h2>
          <div className="channels-cluster">
            <a href="mailto:raph@avae.ai" className="channel-link">
              Email ↗
            </a>
            <a href="https://twitter.com/thekofacts" target="_blank" rel="noopener noreferrer" className="channel-link">
              Twitter / X ↗
            </a>
            <a href="https://linkedin.com/in/obodugo" target="_blank" rel="noopener noreferrer" className="channel-link">
              LinkedIn ↗
            </a>
            <a href="https://calendar.app.google/JWpSBB15VvwmQUdA8" target="_blank" rel="noopener noreferrer" className="channel-link">
              Book a call ↗
            </a>
            <Link href="/photos" className="channel-link">
              Photography →
            </Link>
            <Link href="/stack" className="channel-link">
              Stack →
            </Link>
            <Link href="/now" className="channel-link">
              Now →
            </Link>
          </div>
        </section>

        {/* COLOPHON FOOTER */}
        <footer className="colophon-footer">
          <div className="colophon-left">
            <span>Rapheal Obodugo</span>
            <span className="colophon-sep">·</span>
            <span>Lagos / Riyadh / London</span>
          </div>
          <div className="colophon-right">
            <a href="https://avae.ai" target="_blank" rel="noopener noreferrer" className="colophon-avae">
              Continuous audit by Avae
            </a>
          </div>
        </footer>
      </main>

      <div className="grain"></div>
      <HomeClientBehavior />
    </>
  );
}
