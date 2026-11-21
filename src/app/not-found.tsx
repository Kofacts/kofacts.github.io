import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="tf tf-404">
      <header className="tf-head">
        <div>
          <Link href="/" className="tf-name tf-home">Rapheal Obodugo</Link>
        </div>
        <nav className="tf-nav">
          <Link href="/blog">Writing</Link>
          <Link href="/bookshelf">Books</Link>
          <Link href="/photos">Photographs</Link>
          <Link href="/now">Now</Link>
        </nav>
      </header>

      <section className="tf-row">
        <aside className="tf-margin">404</aside>
        <div className="tf-body">
          <p>
            This page does not exist. It may have been consolidated into a newer piece, or the link
            you followed is outdated.
          </p>
          <p>
            <Link href="/">Home</Link>
            <span className="tf-dim"> · </span>
            <Link href="/blog">Essays</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
