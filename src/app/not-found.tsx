import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Page not found',
};

export default function NotFound() {
  return (
    <main className="page-404">
      <div className="content">
        <h1>404</h1>
        <p>This page doesn't exist.</p>
        <Link href="/">← Back home</Link>
      </div>
    </main>
  );
}
