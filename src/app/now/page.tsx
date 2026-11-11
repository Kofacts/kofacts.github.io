import Link from 'next/link';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now',
  description: 'What Rapheal Obodugo is currently working on',
  alternates: {
    canonical: 'https://obodugo.online/now',
  },
  openGraph: {
    title: 'Now · Rapheal Obodugo',
    description: 'What Rapheal Obodugo is currently working on',
    url: 'https://obodugo.online/now',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function NowPage() {
  const currentlyReading = await fetchGoodreadsCurrentlyReading();

  return (
    <main className="page-now">
      <Link href="/" className="profile-link">
        <span className="back-arrow">←</span>
        <img src="/ajabruwal.png" alt="" className="mini-avatar" />
        <span className="mini-name">Rapheal Obodugo</span>
      </Link>

      <header>
        <h1>Now</h1>
        <p className="subtitle">What I'm focused on right now</p>
        <p className="updated">Last updated: October 2026</p>
      </header>

      <section>
        <h2>Building</h2>
        <div className="item">
          <h3>Avae</h3>
          <p>
            AI personal assistant that actually executes tasks. Private beta — iterating on the core engine, onboarding early design partners, and preparing for a seed round.
          </p>
        </div>
      </section>

      <section>
        <h2>Work</h2>
        <div className="item">
          <h3>Derayah Finance</h3>
          <p>
            Leading engineering for trading dashboards and identity systems. Building the next generation of their client onboarding experience.
          </p>
        </div>
      </section>

      <section>
        <h2>Also</h2>
        <div className="item">
          <h3>Oriafo</h3>
          <p>Director. A palm kernel processing mill in Bende, Abia State, which opened in October 2026.</p>
        </div>
      </section>

      {currentlyReading.length > 0 && (
        <section>
          <h2>Reading</h2>
          {currentlyReading.map((book) => (
            <div key={book.id || book.title} className="item">
              <h3>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  {book.title}
                </a>
              </h3>
              <p>{book.author}</p>
            </div>
          ))}
        </section>
      )}

      <section>
        <h2>Thinking About</h2>
        <div className="item">
          <p>
            How autonomous agents should handle failure. The gap between reliability in demo environments vs. production. Why most automation breaks in emerging markets. The fundraising playbook for infrastructure companies.
          </p>
        </div>
      </section>

      <footer>
        <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">
          What is a /now page?
        </a>
      </footer>
    </main>
  );
}
