import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

const SIZE = { width: 1200, height: 630 };

/* ── page registry ─────────────────────────────────────────── */
export const OG_PAGES = {
  home:      { glyph: '▲', code: '000', label: 'HOME',        index: 0 },
  writing:   { glyph: '¶', code: '001', label: 'WRITING',     index: 1 },
  essay:     { glyph: '§', code: '001', label: 'ESSAY',       index: 1 },
  bookshelf: { glyph: '◆', code: '002', label: 'BOOKSHELF',   index: 2 },
  photos:    { glyph: '●', code: '003', label: 'PHOTOGRAPHS', index: 3 },
  now:       { glyph: '▼', code: '004', label: 'NOW',         index: 4 },
  stack:     { glyph: '■', code: '005', label: 'STACK',       index: 5 },
  notFound:  { glyph: '∅', code: '---', label: '404',         index: 6 },
} as const;

export type PageKey = keyof typeof OG_PAGES;

const TOTAL_PAGES = '007';

/* ── font loading (cached at module level) ─────────────────── */
let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

function loadFonts() {
  if (!fontRegular) {
    fontRegular = readFileSync(join(process.cwd(), 'src/fonts/Georgia.ttf')).buffer as ArrayBuffer;
  }
  if (!fontBold) {
    fontBold = readFileSync(join(process.cwd(), 'src/fonts/Georgia-Bold.ttf')).buffer as ArrayBuffer;
  }
  return { regular: fontRegular, bold: fontBold };
}

/* ── card renderer ─────────────────────────────────────────── */
interface CardOptions {
  page: PageKey;
  title: string;
  subtitle?: string;
  url?: string;
}

export function generateOGCard({ page, title, subtitle, url }: CardOptions) {
  const { regular, bold } = loadFonts();
  const meta = OG_PAGES[page];
  const displayUrl = url || 'obodugo.online';

  // For long titles, reduce font size
  const titleLen = title.length;
  const titleSize = titleLen > 80 ? 28 : titleLen > 50 ? 34 : titleLen > 30 ? 40 : 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '24px',
          backgroundColor: '#0a0a09',
        }}
      >
        {/* Inner card with hairline border */}
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid rgba(196, 192, 184, 0.14)',
            padding: '38px 46px',
          }}
        >
          {/* ── top row: glyph + code ... label ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span
                style={{
                  fontSize: '22px',
                  color: '#6e6a62',
                  lineHeight: 1,
                }}
              >
                {meta.glyph}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#55524b',
                  fontFamily: 'Georgia',
                  letterSpacing: '0.08em',
                }}
              >
                {meta.code}
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                color: '#55524b',
                fontFamily: 'Georgia',
                letterSpacing: '0.22em',
                textTransform: 'uppercase' as const,
              }}
            >
              {meta.label}
            </span>
          </div>

          {/* ── center: title ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: '14px',
              padding: '0 30px',
            }}
          >
            <span
              style={{
                fontSize: `${titleSize}px`,
                color: '#dcd8ce',
                fontFamily: 'GeorgiaBold',
                textAlign: 'center',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                maxWidth: '920px',
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  fontSize: '16px',
                  color: '#7a766e',
                  fontFamily: 'Georgia',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  letterSpacing: '0.02em',
                  maxWidth: '750px',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {/* ── bottom row: coded string ... url ── */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                color: '#44413b',
                fontFamily: 'Georgia',
                letterSpacing: '0.14em',
              }}
            >
              RO · {meta.code}/{TOTAL_PAGES} · MMXXVI
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#44413b',
                fontFamily: 'Georgia',
                letterSpacing: '0.08em',
              }}
            >
              {displayUrl}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [
        { name: 'Georgia', data: regular, style: 'normal' as const, weight: 400 as const },
        { name: 'GeorgiaBold', data: bold, style: 'normal' as const, weight: 700 as const },
      ],
    },
  );
}

export { SIZE as OG_SIZE };
