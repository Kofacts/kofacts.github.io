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
let fontMedium: ArrayBuffer | null = null;

function loadFonts() {
  if (!fontRegular) {
    fontRegular = readFileSync(join(process.cwd(), 'src/fonts/Inter-Regular.woff')).buffer as ArrayBuffer;
  }
  if (!fontMedium) {
    fontMedium = readFileSync(join(process.cwd(), 'src/fonts/Inter-Medium.woff')).buffer as ArrayBuffer;
  }
  return { regular: fontRegular, medium: fontMedium };
}

/* ── card renderer ─────────────────────────────────────────── */
interface CardOptions {
  page: PageKey;
  title: string;
  subtitle?: string;
  url?: string;
}

export function generateOGCard({ page, title, subtitle, url }: CardOptions) {
  const { regular, medium } = loadFonts();
  const meta = OG_PAGES[page];
  const displayUrl = url || 'obodugo.online';

  // For long titles, reduce font size
  const titleLen = title.length;
  const titleSize = titleLen > 80 ? 28 : titleLen > 50 ? 34 : titleLen > 30 ? 40 : 46;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '20px',
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
            border: '1px solid rgba(196, 192, 184, 0.13)',
            padding: '36px 44px',
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
                  fontSize: '20px',
                  color: '#5a5750',
                  fontFamily: 'Inter',
                  lineHeight: 1,
                }}
              >
                {meta.glyph}
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: '#4a4740',
                  fontFamily: 'Inter',
                  letterSpacing: '0.08em',
                }}
              >
                {meta.code}
              </span>
            </div>
            <span
              style={{
                fontSize: '11px',
                color: '#4a4740',
                fontFamily: 'Inter',
                letterSpacing: '0.2em',
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
              gap: '12px',
              padding: '0 40px',
            }}
          >
            <span
              style={{
                fontSize: `${titleSize}px`,
                color: '#d4d0c8',
                fontFamily: 'InterMedium',
                textAlign: 'center',
                lineHeight: 1.3,
                letterSpacing: titleSize >= 40 ? '0.06em' : '0.02em',
                maxWidth: '900px',
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  fontSize: '15px',
                  color: '#6a665e',
                  fontFamily: 'Inter',
                  textAlign: 'center',
                  letterSpacing: '0.03em',
                  maxWidth: '700px',
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
                color: '#3a3730',
                fontFamily: 'Inter',
                letterSpacing: '0.12em',
              }}
            >
              RO · {meta.code}/{TOTAL_PAGES} · MMXXVI
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#3a3730',
                fontFamily: 'Inter',
                letterSpacing: '0.06em',
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
        { name: 'Inter', data: regular, style: 'normal' as const, weight: 400 as const },
        { name: 'InterMedium', data: medium, style: 'normal' as const, weight: 500 as const },
      ],
    },
  );
}

export { SIZE as OG_SIZE };
