import { TfHeader, TfRow, TfFooter } from '@/components/TfShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack · Rapheal Obodugo',
  description: 'Hardware, software, and autonomous systems I use to build and think.',
  alternates: { canonical: 'https://obodugo.online/stack' },
  openGraph: {
    title: 'Stack · Rapheal Obodugo',
    description: 'Hardware, software, and autonomous systems I use to build and think.',
    url: 'https://obodugo.online/stack',
  },
};

export default function StackPage() {
  return (
    <main className="tf">
      <TfHeader title="Stack" sub="Hardware, software, and systems. No sponsorships; all opinions personal." />

      <TfRow label="Executive">
        <dl className="tf-chron">
          <dt></dt>
          <dd>
            <a href="https://avae.ai">Avae</a> — autonomous executive assistant and continuous auditor.
            Task delegation, calendar synthesis, and accounting verification. Currently building this.
          </dd>
        </dl>
      </TfRow>

      <TfRow label="Thinking">
        <dl className="tf-chron">
          <dt></dt>
          <dd><a href="https://notion.so">Notion</a> — project specifications, historical notes, CRM, structural outlines before drafting.</dd>
          <dt></dt>
          <dd><a href="https://rapheal.substack.com">Substack</a> — long-form publication for essays.</dd>
          <dt></dt>
          <dd><a href="https://www.goodreads.com/user/show/183340682">Goodreads</a> — bibliography and annotations, synced to this site.</dd>
        </dl>
      </TfRow>

      <TfRow label="Engineering">
        <dl className="tf-chron">
          <dt></dt>
          <dd>VS Code &amp; Cursor — primary editors. Vim bindings, minimal chrome, Copilot.</dd>
          <dt></dt>
          <dd>Next.js &amp; React — App Router, Server Components, ISR.</dd>
          <dt></dt>
          <dd>Python &amp; PyTorch — financial forensics, adversarial LLM testing, benchmark replication.</dd>
          <dt></dt>
          <dd>GitHub &amp; Vercel — version control, CI/CD, edge deployments.</dd>
          <dt></dt>
          <dd>iTerm2 + zsh + oh-my-zsh. Minimal prompt.</dd>
        </dl>
      </TfRow>

      <TfRow label="Hardware">
        <dl className="tf-chron">
          <dt></dt>
          <dd>Fujifilm X100VI — 23mm f/2 prime, leaf shutter, IBIS. Daily carry.</dd>
          <dt></dt>
          <dd>MacBook Pro 16″ — Apple Silicon, 64GB unified memory.</dd>
          <dt></dt>
          <dd>Sony WH-1000XM5 — noise cancellation for deep focus.</dd>
        </dl>
      </TfRow>

      <TfRow label="Communication">
        <dl className="tf-chron">
          <dt></dt>
          <dd>Gmail — inbox zero, Avae triage.</dd>
          <dt></dt>
          <dd><a href="https://cal.com">Cal.com</a> — meeting scheduling, timezone-aware, buffer times.</dd>
        </dl>
      </TfRow>

      <TfFooter note="Updated October 2026." />
    </main>
  );
}
