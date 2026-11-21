import Link from 'next/link';
import { fetchRSSPosts } from '@/utils/rss';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION } from '@/consts';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'profile',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: 'https://obodugo.online/',
    images: ['https://obodugo.online/ogmeta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['https://obodugo.online/ogmeta.png'],
  },
};

export const revalidate = 900; // 15 minutes ISR

function month(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
}

export default async function HomePage() {
  const posts = await fetchRSSPosts();
  const reading = await fetchGoodreadsCurrentlyReading();

  // Group essays by year, newest first
  const byYear = new Map<string, typeof posts>();
  for (const p of posts.slice(0, 16)) {
    const y = String(new Date(p.date).getFullYear() || '');
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rapheal Obodugo',
    url: 'https://obodugo.online',
    jobTitle: 'Founder',
    worksFor: { '@type': 'Organization', name: 'Avae', url: 'https://avae.ai' },
  };

  return (
    <main className="tf">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="tf-head">
        <div>
          <h1 className="tf-name">Rapheal Obodugo</h1>
          <p className="tf-tag">Lagos, Riyadh &amp; London</p>
        </div>
        <nav className="tf-nav">
          <Link href="/blog">Writing</Link>
          <Link href="/bookshelf">Books</Link>
          <Link href="/photos">Photographs</Link>
          <Link href="/now">Now</Link>
        </nav>
      </header>

      {/* ABOUT */}
      <section className="tf-row">
        <aside className="tf-margin">About</aside>
        <div className="tf-body">
          <p className="tf-lede">
            I run <a href="https://avae.ai">Avae</a>, an applied research company working on continuous audit
            for finance. Most financial software assumes a number is correct because an API returned it. We
            build systems that check.
          </p>
          <p>
            I&rsquo;m also a director of <a href="https://oriafo.com">Oriafo</a>, a palm kernel mill in Bende,
            Abia State.{' '}
            I read mostly history, philosophy and biography, because I like knowing how unusual people actually
            thought and why large systems behave the way they do. Fiction when I need to leave the room.
          </p>
          <p>
            I advise a small number of early-stage founders on product and engineering. If you&rsquo;re building
            something genuinely odd, <a href="mailto:raph@avae.ai">write to me</a>.
          </p>
        </div>
      </section>

      {/* CHRONOLOGY */}
      <section className="tf-row">
        <aside className="tf-margin">Work</aside>
        <div className="tf-body">
          <dl className="tf-chron">
            <dt>2026&ndash;</dt>
            <dd>
              <a href="https://avae.ai">Avae</a>, founder. Multi-agent verification for audit at the scale of
              tens of thousands of transactions.
            </dd>
            <dt>2024&ndash;25</dt>
            <dd>
              MySub, founder. Recurring payments for emerging markets; 360,000 accounts; acquired.
            </dd>
            <dt>2022&ndash;24</dt>
            <dd>
              Derayah Financial, Riyadh. Head of engineering across wealth management, market execution and
              retail investing.
            </dd>
            <dt>2021&ndash;22</dt>
            <dd>Meta. Infrastructure: distributed systems, data pipelines, network reliability.</dd>
          </dl>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="tf-row">
        <aside className="tf-margin">Research</aside>
        <div className="tf-body">
          <p>
            <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6944801">
              Adversarial consensus verification for reliable LLM agents in financial forensics
            </a>
            <span className="tf-sn">
              With Zacchaeus Bolaji and John Hella. SSRN&nbsp;6944801, 2026. The benchmark is the Pave
              Interchange suite.
            </span>
            . Single-agent models fall below 55% accuracy on forensic reconciliation. A small committee of
            adversarial agents that must agree before answering reaches 100% across all 24 tasks on a
            50,000-record benchmark. The interesting part is not the number but why disagreement is cheaper
            than confidence.
          </p>
        </div>
      </section>

      {/* WRITING */}
      <section className="tf-row">
        <aside className="tf-margin">Writing</aside>
        <div className="tf-body">
          {[...byYear.entries()].map(([year, items]) => (
            <div key={year} className="tf-year">
              <span className="tf-year-label">{year}</span>
              <ul className="tf-list">
                {items.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
                    <span className="tf-date">{month(p.date)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="tf-more">
            <Link href="/blog">Everything ({posts.length})</Link>
            <span className="tf-dim"> &middot; by email via </span>
            <a href="https://rapheal.substack.com">Substack</a>
            <span className="tf-dim"> &middot; </span>
            <a href="/rss.xml">RSS</a>
          </p>
        </div>
      </section>

      {/* READING */}
      {reading.length > 0 && (
        <section className="tf-row">
          <aside className="tf-margin">Reading</aside>
          <div className="tf-body">
            <p>
              {reading.map((b, i) => (
                <span key={b.id || b.title}>
                  <a href={b.link}>
                    <em>{b.title}</em>
                  </a>
                  <span className="tf-dim"> by {b.author}</span>
                  {i < reading.length - 1 ? '; ' : '. '}
                </span>
              ))}
              <Link href="/bookshelf" className="tf-dim-link">
                Past reading &rarr;
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* ELSEWHERE */}
      <section className="tf-row">
        <aside className="tf-margin">Elsewhere</aside>
        <div className="tf-body">
          <p>
            On <a href="https://www.youtube.com/watch?v=V0tF9O2yFJc">CNBC Africa</a>, about AI and the future of
            work on the continent; on a <a href="https://www.youtube.com/watch?v=psNpGTZlspc">panel</a> about the
            9-to-5 in an age of agents. Gold Stevie for achievement in science or technology, Middle East
            &amp; Africa, 2025. <Link href="/photos">Photographs</Link> from a Fujifilm X100VI, and the{' '}
            <Link href="/stack">tools</Link> I use daily.
          </p>
        </div>
      </section>

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
            <a href="https://calendar.app.google/JWpSBB15VvwmQUdA8">Calendar</a>
            <p className="tf-colophon">
              Set in the serif your machine already has. No analytics, no cookies. Updated November 2026.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
