import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Now · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'now',
    title: 'Now',
    subtitle: 'A snapshot of current focus',
    url: 'obodugo.online/now',
  });
}
