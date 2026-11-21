import Link from 'next/link';
import { fetchGoodreadsCurrentlyReading } from '@/utils/goodreads';
import { TfHeader, TfRow, TfFooter } from '@/components/TfShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Now · Rapheal Obodugo',
  description: 'What Rapheal Obodugo is currently working on and thinking about',
  alternates: { canonical: 'https://obodugo.online/now' },
  openGraph: {
    title: 'Now · Rapheal Obodugo',
    description: 'What Rapheal Obodugo is currently working on and thinking about',
    url: 'https://obodugo.online/now',
  },
};

export const revalidate = 1800; // 30 minutes ISR

export default async function NowPage() {
  const reading = await fetchGoodreadsCurrentlyReading();

  return (
    <main className="tf">
      <TfHeader
        title="Now"
        sub={
          <>
            A snapshot of current focus. Updated October 2026.{' '}
            <a href="https://nownownow.com/about">What is a /now page? ↗</a>
          </>
        }
      />

      <TfRow label="Building">
        <p>
          <a href="https://avae.ai">Avae</a> — continuous audit for modern finance. Iterating on the
          multi-agent reconciliation architecture, onboarding institutional design partners, and preparing
          for a seed round. The product is in private beta.
        </p>
      </TfRow>

      <TfRow label="Work">
        <p>
          Derayah Financial, Riyadh. Engineering leadership across trading platforms, identity
          infrastructure, and high-frequency execution pipelines.
        </p>
      </TfRow>

      <TfRow label="Industry">
        <p>
          <a href="https://oriafo.com">Oriafo</a> — a commercial palm kernel processing mill in Bende,
          Abia State, opened October 2026. Commissioning industrial equipment for vegetable oil production.
        </p>
      </TfRow>

      {reading.length > 0 && (
        <TfRow label="Reading">
          <p>
            {reading.map((b, i) => (
              <span key={b.id || b.title}>
                <a href={b.link}><em>{b.title}</em></a>
                <span className="tf-dim"> by {b.author}</span>
                {i < reading.length - 1 ? '; ' : '. '}
              </span>
            ))}
          </p>
        </TfRow>
      )}

      <TfRow label="Inquiry">
        <p className="tf-dim" style={{ fontStyle: 'italic' }}>
          How autonomous agents should handle failure. The gap between reliability in demo environments
          vs. production. Why most automation breaks in emerging markets. The fundraising playbook for
          infrastructure companies.
        </p>
      </TfRow>

      <TfFooter />
    </main>
  );
}
