import Link from 'next/link';
import { fetchGoodreadsReadBooks } from '@/utils/goodreads';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: "Books I've read",
  alternates: {
    canonical: 'https://obodugo.online/bookshelf',
  },
  openGraph: {
    title: 'Bookshelf · Rapheal Obodugo',
    description: "Books I've read",
    url: 'https://obodugo.online/bookshelf',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function BookshelfPage() {
  const books = await fetchGoodreadsReadBooks();

  return (
    <main className="page-bookshelf">
      <Link href="/" className="profile-link">
        <span className="back-arrow">←</span>
        <img src="/ajabruwal.png" alt="" className="mini-avatar" />
        <span className="mini-name">Rapheal Obodugo</span>
      </Link>

      <header>
        <h1>Bookshelf</h1>
        <p className="subtitle">{books.length} books read</p>
      </header>

      <div className="books-grid">
        {books.map((book) => (
          <a
            key={book.id || book.title}
            href={book.link}
            className="book"
            target="_blank"
            rel="noopener noreferrer"
          >
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-cover"
                loading="lazy"
              />
            )}
            <div className="book-info">
              <span className="book-title">{book.title}</span>
              <span className="book-author">{book.author}</span>
              {book.rating > 0 && (
                <span className="book-rating">
                  {'★'.repeat(book.rating)}
                  {'☆'.repeat(5 - book.rating)}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>

      <footer>
        Synced from{' '}
        <a
          href="https://www.goodreads.com/user/show/183340682"
          target="_blank"
          rel="noopener noreferrer"
        >
          Goodreads
        </a>
      </footer>
    </main>
  );
}
