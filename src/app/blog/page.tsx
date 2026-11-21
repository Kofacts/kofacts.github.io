import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import { TfHeader, TfRow, TfFooter } from '@/components/TfShell';
import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const metadata: Metadata = {
  title: 'Essays · Rapheal Obodugo',
  description: 'Essays on autonomous systems, financial verification, artificial intelligence, epistemology, and literature.',
  alternates: {
    canonical: 'https://obodugo.online/blog',
  },
  openGraph: {
    title: `Essays · ${SITE_TITLE}`,
    description: SITE_DESCRIPTION,
    url: 'https://obodugo.online/blog',
  },
};

export const revalidate = 900; // 15 minutes ISR

function day(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

function teaser(desc: string) {
  const t = (desc || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return t.length > 150 ? t.slice(0, 150).trim() + '…' : t;
}

export default async function BlogIndexPage() {
  const posts = await fetchRSSPosts();

  const byYear = new Map<string, typeof posts>();
  for (const p of posts) {
    const y = String(new Date(p.date).getFullYear() || '—');
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }

  return (
    <main className="tf">
      <TfHeader
        title="Writing"
        sub={
          <>
            {posts.length} essays on verification, agents, history and building. Also by email via{' '}
            <a href="https://obodugo.substack.com">Substack</a>.
          </>
        }
      />

      {[...byYear.entries()].map(([year, items]) => (
        <TfRow key={year} label={year}>
          <ul className="tf-index">
            {items.map((p) => (
              <li key={p.slug}>
                <div className="tf-index-line">
                  <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                  <span className="tf-date">{day(p.date)}</span>
                </div>
                {p.description ? <p className="tf-index-desc">{teaser(p.description)}</p> : null}
              </li>
            ))}
          </ul>
        </TfRow>
      ))}

      <TfFooter note="All thoughts are my own, and revised without notice." />
    </main>
  );
}
