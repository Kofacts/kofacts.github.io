import type { Metadata } from 'next';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_AUTHOR, SITE_KEYWORDS } from '@/consts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://obodugo.online'),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_AUTHOR, url: 'https://obodugo.online' }],
  keywords: SITE_KEYWORDS,
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
  alternates: {
    canonical: 'https://obodugo.online/',
    types: {
      'application/rss+xml': [{ url: 'https://obodugo.online/rss.xml', title: SITE_TITLE }],
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://obodugo.online/',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['https://obodugo.online/ogmeta.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['https://obodugo.online/ogmeta.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" href="/sitemap-index.xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
