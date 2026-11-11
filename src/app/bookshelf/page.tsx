import Link from 'next/link';
import { fetchGoodreadsReadBooks } from '@/utils/goodreads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookshelf · Rapheal Obodugo',
  description: 'A working library of history, epistemology, biographies, systems, and literature.',
  alternates: {
    canonical: 'https://obodugo.online/bookshelf',
  },
  openGraph: {
    title: 'Bookshelf · Rapheal Obodugo',
    description: 'A working library of history, epistemology, biographies, systems, and literature.',
    url: 'https://obodugo.online/bookshelf',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function BookshelfPage() {
  const books = await fetchGoodreadsReadBooks();

  return (
    <main className="page-bookshelf taste-master">
      {/* EDITORIAL SUBPAGE NAV */}
      <div className="subpage-nav">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>
        <span className="subpage-crumb">Bookshelf</span>
      </div>

      {/* HEADER */}
      <header className="page-header">
        <h1 className="page-title">Bookshelf</h1>
        <p className="page-subtitle">
          A working library of history, epistemology, biographies, systems, and literature.
        </p>
        <div className="page-meta-strip">
          <span className="meta-item">{books.length} volumes cataloged</span>
          <span className="meta-sep">·</span>
          <a
            href="https://www.goodreads.com/user/show/183340682"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            Goodreads archive ↗
          </a>
        </div>
      </header>

      {/* 3D MONOGRAPH LIBRARY GRID */}
      <section className="bookshelf-grid-section">
        <div className="bookshelf-library-grid">
          {books.map((book) => (
            <a
              key={book.id || book.title}
              href={book.link}
              className="shelf-book-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="shelf-book-frame">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="shelf-book-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="shelf-book-fallback">
                    <span className="fallback-title">{book.title}</span>
                    <span className="fallback-author">{book.author}</span>
                  </div>
                )}
                <div className="shelf-spine-edge" />
              </div>
              <div className="shelf-book-meta">
                <span className="shelf-book-title">{book.title}</span>
                <span className="shelf-book-author">{book.author}</span>
                {book.rating > 0 && (
                  <div className="shelf-book-stars" aria-label={`${book.rating} out of 5 stars`}>
                    <span className="stars-active">{'★'.repeat(book.rating)}</span>
                    <span className="stars-empty">{'☆'.repeat(5 - book.rating)}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="subpage-footer">
        <Link href="/" className="subpage-back-link">
          ← Return to main index
        </Link>
        <span className="subpage-footer-copy">Synced via Goodreads · Obodugo © 2026</span>
      </footer>
    </main>
  );
}
