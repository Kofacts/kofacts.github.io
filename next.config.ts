import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname),
  async rewrites() {
    return [
      {
        source: '/sitemap-index.xml',
        destination: '/sitemap.xml',
      },
      {
        source: '/sitemap-0.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
