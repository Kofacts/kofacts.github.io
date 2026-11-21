import { fetchGoodreadsReadBooks } from '@/utils/goodreads';
import { TfHeader, TfFooter } from '@/components/TfShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookshelf · Rapheal Obodugo',
  description: 'A working library of history, epistemology, biographies, systems, and literature.',
  alternates: { canonical: 'https://obodugo.online/bookshelf' },
  openGraph: {
    title: 'Bookshelf · Rapheal Obodugo',
    description: 'A working library of history, epistemology, biographies, systems, and literature.',
    url: 'https://obodugo.online/bookshelf',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function BookshelfPage() {
  const books = await fetchGoodreadsReadBooks();

  /* ---- group by first letter of author surname ---- */
  const grouped = new Map<string, typeof books>();
  for (const book of books) {
    const parts = book.author.split(/\s+/);
    const surname = parts[parts.length - 1] || '?';
    const letter = surname[0]?.toUpperCase() || '#';
    if (!grouped.has(letter)) grouped.set(letter, []);
    grouped.get(letter)!.push(book);
  }
  const sortedLetters = [...grouped.keys()].sort();

  return (
    <main className="tf">
      <TfHeader
        title="Bookshelf"
        sub={
          <>
            {books.length} volumes catalogued. History, epistemology, biography,
            systems, literature, and the occasional novel.{' '}
            <a href="https://www.goodreads.com/user/show/183340682">
              Goodreads&nbsp;↗
            </a>
          </>
        }
      />

      {/* ---- spine strip — a visual fingerprint of the library ---- */}
      <div className="tf-spines" aria-hidden="true">
        {books.map((book, i) => (
          <span
            key={book.id || i}
            className="tf-spine"
            style={{
              width: `${Math.max(3, Math.min(8, (book.title.length % 6) + 3))}px`,
            }}
          />
        ))}
      </div>

      {/* ---- register entries, grouped by author surname letter ---- */}
      <section className="tf-register">
        {sortedLetters.map((letter) => (
          <div key={letter} className="tf-register-group">
            <span className="tf-register-letter">{letter}</span>
            <ol className="tf-register-list">
              {grouped.get(letter)!.map((book) => (
                <li key={book.id || book.title} className="tf-entry">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="tf-entry-title">{book.title}</span>
                    <span className="tf-entry-dash"> — </span>
                    <span className="tf-entry-author">{book.author}</span>
                    {book.rating > 0 && (
                      <span className="tf-entry-stars">
                        {'★'.repeat(book.rating)}
                        <span className="tf-entry-stars-empty">
                          {'☆'.repeat(5 - book.rating)}
                        </span>
                      </span>
                    )}
                    {book.imageUrl && (
                      <span className="tf-entry-cover">
                        <img
                          src={book.imageUrl}
                          alt=""
                          loading="lazy"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <TfFooter />
    </main>
  );
}
