import Link from 'next/link';
import { fetchGoodreadsReadBooks } from '@/utils/goodreads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookshelf · Rapheal Obodugo',
  description: "A working library of history, epistemology, biographies, systems, and literature.",
  alternates: {
    canonical: 'https://obodugo.online/bookshelf',
  },
  openGraph: {
    title: 'Bookshelf · Rapheal Obodugo',
    description: "A working library of history, epistemology, biographies, systems, and literature.",
    url: 'https://obodugo.online/bookshelf',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function BookshelfPage() {
  const books = await fetchGoodreadsReadBooks();

  return (
    <main className="page-bookshelf taste-master">
      <div className="subpage-nav">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>
        <span className="subpage-crumb">Bookshelf</span>
      </div>

      <header className="page-header">
        <h1 className="page-title">Bookshelf</h1>
        <p className="page-subtitle">A working library of history, epistemology, biographies, systems, and literature.</p>
        <div className="page-meta-strip">
          <span className="meta-item">{books.length} volumes cataloged</span>
          <span className="meta-sep">·</span>
          <a
            href="https://www.goodreads.com/user/show/183340682"
            target="_blank"
            rel="noopener noreferrer"
            className="meta-link"
          >
            Goodreads profile ↗
          </a>
        </div>
      </header>

      <section className="bookshelf-grid-section">
        <div className="bookshelf-library-grid">
          {books.map((book) => (
            <a
              key={book.id || book.title}
              href={book.link}
              className="shelf-book-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="shelf-cover-frame">
                {book.imageUrl ? (
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="shelf-book-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="shelf-cover-fallback">
                    <span>{book.title}</span>
                  </div>
                )}
              </div>
              <div className="shelf-book-meta">
                <h3 className="shelf-book-name">{book.title}</h3>
                <span className="shelf-book-creator">{book.author}</span>
                {book.rating > 0 && (
                  <div className="shelf-book-stars" aria-label={`${book.rating} out of 5 stars`}>
                    {'★'.repeat(book.rating)}
                    <span className="stars-empty">{'★'.repeat(5 - book.rating)}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="subpage-footer">
        <div className="footer-left">
          <span>Rapheal Obodugo</span>
          <span className="footer-sep">·</span>
          <span>Reading archive</span>
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
          <Link href="/now" className="footer-link">
            Now
          </Link>
        </div>
      </footer>
    </main>
  );
}
