import Link from 'next/link';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now · Rapheal Obodugo',
  description: 'What Rapheal Obodugo is currently working on and thinking about',
  alternates: {
    canonical: 'https://obodugo.online/now',
  },
  openGraph: {
    title: 'Now · Rapheal Obodugo',
    description: 'What Rapheal Obodugo is currently working on and thinking about',
    url: 'https://obodugo.online/now',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function NowPage() {
  const currentlyReading = await fetchGoodreadsCurrentlyReading();

  return (
    <main className="page-now taste-master">
      <div className="subpage-nav">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>
        <span className="subpage-crumb">Now</span>
      </div>

      <header className="page-header">
        <h1 className="page-title">Now</h1>
        <p className="page-subtitle">A public ledger of current focus, active ventures, and open inquiry.</p>
        <div className="page-meta-strip">
          <span className="meta-item">Updated October 2026</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Lagos / London</span>
          <span className="meta-sep">·</span>
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            What is a /now page? ↗
          </a>
        </div>
      </header>

      {/* FOCUS LEDGER */}
      <section className="now-ledger-section">
        <h2 className="section-label">Active Focus</h2>
        <div className="now-ledger-rows">
          <div className="now-ledger-row">
            <div className="now-col-label">Building</div>
            <div className="now-col-main">
              <div className="now-title-line">
                <span className="now-subject">Avae</span>
                <span className="now-status">Founder · Private Beta</span>
              </div>
              <p className="now-desc">
                Continuous audit for modern finance. Iterating on our deterministic multi-agent reconciliation architecture, onboarding institutional design partners, and preparing for a seed round.
              </p>
            </div>
          </div>

          <div className="now-ledger-row">
            <div className="now-col-label">Work</div>
            <div className="now-col-main">
              <div className="now-title-line">
                <span className="now-subject">Derayah Finance</span>
                <span className="now-status">Engineering Leadership</span>
              </div>
              <p className="now-desc">
                Guiding engineering across trading platforms, identity infrastructure, and high-frequency execution pipelines.
              </p>
            </div>
          </div>

          <div className="now-ledger-row">
            <div className="now-col-label">Industry</div>
            <div className="now-col-main">
              <div className="now-title-line">
                <span className="now-subject">Oriafo</span>
                <span className="now-status">Director</span>
              </div>
              <p className="now-desc">
                A commercial palm kernel processing mill in Bende, Abia State, Nigeria, which opened in October 2026.
              </p>
            </div>
          </div>

          {currentlyReading.length > 0 && (
            <div className="now-ledger-row">
              <div className="now-col-label">Reading</div>
              <div className="now-col-main">
                <div className="now-reading-list">
                  {currentlyReading.map((book) => (
                    <a
                      key={book.id || book.title}
                      href={book.link}
                      className="now-book-item"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="now-book-title">{book.title}</span>
                      <span className="now-book-author">by {book.author} ↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="now-ledger-row">
            <div className="now-col-label">Inquiry</div>
            <div className="now-col-main">
              <p className="now-inquiry-quote">
                &ldquo;How autonomous agents should handle failure. The gap between reliability in demo environments vs. production. Why most automation breaks in emerging markets. The fundraising playbook for infrastructure companies.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="subpage-footer">
        <div className="footer-left">
          <span>Rapheal Obodugo</span>
          <span className="footer-sep">·</span>
          <span>Lagos / Riyadh / London</span>
        </div>
        <div className="footer-right">
          <Link href="/" className="footer-link">
            Home
          </Link>
          <span className="footer-sep">·</span>
          <Link href="/blog" className="footer-link">
            Essays
          </Link>
          <span className="footer-sep">·</span>
          <Link href="/bookshelf" className="footer-link">
            Bookshelf
          </Link>
        </div>
      </footer>
    </main>
  );
}
