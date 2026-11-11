import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Folio Not Found · Rapheal Obodugo',
  description: 'The requested folio or monograph does not exist in this archive.',
};

export default function NotFound() {
  return (
    <main className="page-404 taste-master">
      <div className="subpage-nav">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>
        <span className="subpage-crumb">404</span>
      </div>

      <div className="not-found-container">
        <div className="not-found-kicker">Index Reference 404</div>
        <h1 className="not-found-title">The requested folio does not exist.</h1>
        <p className="not-found-desc">
          The link you followed may be outdated, or the monograph was consolidated into a newer edition or archived.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="taste-button primary">
            ← Return to main index
          </Link>
          <Link href="/blog" className="taste-button secondary">
            Browse essays
          </Link>
        </div>
      </div>

      <footer className="subpage-footer">
        <span className="subpage-footer-copy">Rapheal Obodugo · Lagos / London</span>
      </footer>
    </main>
  );
}
