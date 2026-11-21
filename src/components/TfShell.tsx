import Link from 'next/link';
import type { ReactNode } from 'react';

/** Shared chrome for the text-first design: header, labelled rows, footer. */

export function TfHeader({ title, sub }: { title?: string; sub?: ReactNode }) {
  return (
    <header className="tf-head">
      <div>
        <Link href="/" className="tf-name tf-home">
          Rapheal Obodugo
        </Link>
        {title ? (
          <h1 className="tf-title">{title}</h1>
        ) : null}
        {sub ? <p className="tf-tag">{sub}</p> : null}
      </div>
      <nav className="tf-nav">
        <Link href="/blog">Writing</Link>
        <Link href="/bookshelf">Books</Link>
        <Link href="/photos">Photographs</Link>
        <Link href="/now">Now</Link>
      </nav>
    </header>
  );
}

export function TfRow({ label, children, className }: { label?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`tf-row${className ? ' ' + className : ''}`}>
      <aside className="tf-margin">{label}</aside>
      <div className="tf-body">{children}</div>
    </section>
  );
}

export function TfFooter({ note }: { note?: ReactNode }) {
  return (
    <footer className="tf-foot">
      <div className="tf-row tf-row-foot">
        <aside className="tf-margin">Contact</aside>
        <div className="tf-body">
          <a href="mailto:raph@avae.ai">raph@avae.ai</a>
          <span className="tf-dim"> &middot; </span>
          <a href="https://twitter.com/thekofacts">Twitter</a>
          <span className="tf-dim"> &middot; </span>
          <a href="https://linkedin.com/in/obodugo">LinkedIn</a>
          <span className="tf-dim"> &middot; </span>
          <a href="/rss.xml">RSS</a>
          <p className="tf-colophon">
            {note ?? 'Set in the serif your machine already has. No analytics, no cookies.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
