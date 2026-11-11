import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack · Rapheal Obodugo',
  description: 'Hardware, software, and autonomous systems I use to build and think.',
  alternates: {
    canonical: 'https://obodugo.online/stack',
  },
  openGraph: {
    title: 'Stack · Rapheal Obodugo',
    description: 'Hardware, software, and autonomous systems I use to build and think.',
    url: 'https://obodugo.online/stack',
  },
};

export default function StackPage() {
  return (
    <main className="page-stack taste-master">
      {/* MONOGRAPH SUBPAGE NAV */}
      <div className="subpage-nav">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>
        <span className="subpage-crumb">Stack</span>
      </div>

      {/* HEADER */}
      <header className="page-header">
        <h1 className="page-title">Stack</h1>
        <p className="page-subtitle">
          Hardware, software, and autonomous tooling deployed in daily engineering, research, and life.
        </p>
        <div className="page-meta-strip">
          <span className="meta-item">Updated October 2026</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Zero sponsored placements</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">All opinions personal</span>
        </div>
      </header>

      {/* EXECUTIVE & AUTONOMOUS LAYER */}
      <section className="stack-ledger-section">
        <h2 className="stack-section-title">Autonomous & Executive</h2>
        <p className="stack-section-desc">Autonomous systems managing asynchronous work, continuous audit, and triage.</p>
        <div className="stack-rows">
          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">
                  <a href="https://avae.ai" target="_blank" rel="noopener noreferrer">
                    Avae
                  </a>
                </span>
                <span className="stack-item-badge">Active Build</span>
              </div>
              <p className="stack-item-desc">
                Autonomous executive assistant and continuous financial auditor. Executes deep task synthesis, calendar delegation, and accounting verification without conversational friction.
              </p>
            </div>
            <div className="stack-item-aside">Primary orchestration</div>
          </div>
        </div>
      </section>

      {/* THINKING & SCHEMAS */}
      <section className="stack-ledger-section">
        <h2 className="stack-section-title">Thinking & Schemas</h2>
        <p className="stack-section-desc">Monograph drafts, knowledge retention, and reading bibliography.</p>
        <div className="stack-rows">
          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">
                  <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
                    Notion
                  </a>
                </span>
              </div>
              <p className="stack-item-desc">
                Second brain schema. Houses project specifications, historical notes, CRM records, and structural outlines before drafting.
              </p>
            </div>
            <div className="stack-item-aside">Knowledge architecture</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">
                  <a href="https://rapheal.substack.com" target="_blank" rel="noopener noreferrer">
                    Substack
                  </a>
                </span>
              </div>
              <p className="stack-item-desc">
                Public long-form publication engine for essays on epistemology, financial forensics, and systemic incentives.
              </p>
            </div>
            <div className="stack-item-aside">Essays & letters</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">
                  <a href="https://www.goodreads.com/user/show/183340682" target="_blank" rel="noopener noreferrer">
                    Goodreads
                  </a>
                </span>
              </div>
              <p className="stack-item-desc">
                Cataloged archive of books read, margin annotations, and bibliographic references synced directly to this site.
              </p>
            </div>
            <div className="stack-item-aside">Bibliography</div>
          </div>
        </div>
      </section>

      {/* CODE & RUNTIME */}
      <section className="stack-ledger-section">
        <h2 className="stack-section-title">Engineering & Runtime</h2>
        <p className="stack-section-desc">Compilers, editors, runtime platforms, and machine learning toolkits.</p>
        <div className="stack-rows">
          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">VS Code & Cursor</span>
              </div>
              <p className="stack-item-desc">
                Primary editing environments configured with custom vim bindings, minimal syntax chrome, and Copilot.
              </p>
            </div>
            <div className="stack-item-aside">Primary IDE</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">Next.js & React</span>
              </div>
              <p className="stack-item-desc">
                App Router, Server Components, and static ISR compilation for sub-50ms TTFB across all portfolio pages.
              </p>
            </div>
            <div className="stack-item-aside">Web runtime</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">Python & PyTorch</span>
              </div>
              <p className="stack-item-desc">
                Financial forensics model evaluation, adversarial LLM testing, and benchmark replication (SSRN: 5747683).
              </p>
            </div>
            <div className="stack-item-aside">Research stack</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">GitHub & Vercel</span>
              </div>
              <p className="stack-item-desc">
                Version control, automated GitHub Actions pipelines, and globally distributed edge deployments.
              </p>
            </div>
            <div className="stack-item-aside">CI/CD & Edge</div>
          </div>
        </div>
      </section>

      {/* OPTICS & HARDWARE */}
      <section className="stack-ledger-section">
        <h2 className="stack-section-title">Optics & Hardware</h2>
        <p className="stack-section-desc">Physical gear for street photography, mobile compute, and deep concentration.</p>
        <div className="stack-rows">
          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">Fujifilm X100VI</span>
                <span className="stack-item-badge">Everyday Carry</span>
              </div>
              <p className="stack-item-desc">
                Fixed 23mm F2 prime lens (35mm equivalent). Built-in 6-stop IBIS and leaf shutter for silent documentary captures across Lagos, London, and Riyadh.
              </p>
            </div>
            <div className="stack-item-aside">Primary camera</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">Apple MacBook Pro 16″</span>
              </div>
              <p className="stack-item-desc">
                Apple Silicon architecture with 64GB unified memory. Handles heavy local containerized clusters and local LLM fine-tunes without thermal throttling.
              </p>
            </div>
            <div className="stack-item-aside">Daily workstation</div>
          </div>

          <div className="stack-row">
            <div className="stack-main-col">
              <div className="stack-item-primary">
                <span className="stack-item-title">Sony WH-1000XM5</span>
              </div>
              <p className="stack-item-desc">
                Active noise cancellation for deep focus sessions in transit and busy engineering offices.
              </p>
            </div>
            <div className="stack-item-aside">Acoustic isolation</div>
          </div>
        </div>
      </section>

      {/* SUBPAGE FOOTER */}
      <footer className="subpage-footer">
        <Link href="/" className="subpage-back-link">
          ← Return to main index
        </Link>
        <span className="subpage-footer-copy">Obodugo © 2026</span>
      </footer>
    </main>
  );
}
