import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stack',
  description: 'Tools and systems I use to get things done',
  alternates: {
    canonical: 'https://obodugo.online/stack',
  },
  openGraph: {
    title: 'Stack · Rapheal Obodugo',
    description: 'Tools and systems I use to get things done',
    url: 'https://obodugo.online/stack',
  },
};

export default function StackPage() {
  return (
    <main className="page-stack">
      <Link href="/" className="profile-link">
        <span className="back-arrow">←</span>
        <img src="/ajabruwal.png" alt="" className="mini-avatar" />
        <span className="mini-name">Rapheal Obodugo</span>
      </Link>

      <header>
        <h1>Stack</h1>
        <p className="subtitle">Tools and systems I use to get things done</p>
      </header>

      <section>
        <h2>Executive Layer</h2>
        <p className="section-intro">The brain that orchestrates everything else.</p>

        <div className="tool featured">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8V4H8" />
              <rect x="8" y="2" width="8" height="4" rx="1" />
              <rect x="4" y="8" width="16" height="12" rx="2" />
              <circle cx="9" cy="13" r="1" />
              <circle cx="15" cy="13" r="1" />
              <path d="M9 17h6" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://avae.ai" target="_blank" rel="noopener noreferrer">
                Avae
              </a>
            </h3>
            <p>
              My AI executive assistant. Handles task execution, scheduling, research, and delegation. Not just a chatbot — it actually does things. Currently in private beta.
            </p>
            <span className="tool-tag">Building this</span>
          </div>
        </div>
      </section>

      <section>
        <h2>Thinking & Writing</h2>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M9 4v16" />
              <path d="M12 8h5" />
              <path d="M12 12h5" />
              <path d="M12 16h5" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://notion.so" target="_blank" rel="noopener noreferrer">
                Notion
              </a>
            </h3>
            <p>Second brain. Project wikis, meeting notes, personal CRM, and everything in between.</p>
          </div>
        </div>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://substack.com" target="_blank" rel="noopener noreferrer">
                Substack
              </a>
            </h3>
            <p>Where I publish essays. Clean writing experience, built-in audience.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Development</h2>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer">
                VS Code
              </a>
            </h3>
            <p>Primary editor. Extensions: GitHub Copilot, Prettier, GitLens.</p>
          </div>
        </div>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </h3>
            <p>Code hosting, CI/CD pipelines, project management.</p>
          </div>
        </div>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>Terminal</h3>
            <p>iTerm2 + zsh + oh-my-zsh. Minimal prompt.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Communication</h2>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>Email</h3>
            <p>Gmail. Inbox zero obsessive. Avae helps triage.</p>
          </div>
        </div>

        <div className="tool">
          <div className="tool-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="tool-content">
            <h3>
              <a href="https://cal.com" target="_blank" rel="noopener noreferrer">
                Cal.com
              </a>
            </h3>
            <p>Meeting scheduling. Time zone aware, buffer times between calls.</p>
          </div>
        </div>
      </section>

      <footer>Updated January 2026</footer>
    </main>
  );
}
