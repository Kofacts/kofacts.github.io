import { fetchGoodreadsReadBooks } from '@/utils/goodreads';
import { TfHeader, TfFooter } from '@/components/TfShell';
import { SpineStrip, type SpineBook } from '@/components/SpineStrip';
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

  // Build sequential catalog IDs and flatten spines in the exact A-Z register order
  let counter = 0;
  const spineBooks: SpineBook[] = [];
  const letterEntries = new Map<string, { book: typeof books[0]; domId: string }[]>();

  for (const letter of sortedLetters) {
    const list = grouped.get(letter)!;
    const items = list.map((b) => {
      counter++;
      const safeKey = (b.id || b.title).replace(/[^\w-]/g, '').slice(0, 20);
      const domId = `bk-${counter}-${safeKey}`;
      spineBooks.push({
        domId,
        title: b.title,
        author: b.author,
        rating: b.rating,
        letter,
      });
      return { book: b, domId };
    });
    letterEntries.set(letter, items);
  }

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

      {/* ---- interactive spine strip: scrub or click any spine to jump ---- */}
      <SpineStrip books={spineBooks} />

      {/* ---- register entries, grouped by author surname letter ---- */}
      <section className="tf-register">
        {sortedLetters.map((letter) => (
          <div key={letter} className="tf-register-group">
            <span className="tf-register-letter">{letter}</span>
            <ol className="tf-register-list">
              {letterEntries.get(letter)!.map(({ book, domId }) => (
                <li
                  key={domId}
                  id={domId}
                  className="tf-entry"
                  data-spine-id={`spine-${domId}`}
                >
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
