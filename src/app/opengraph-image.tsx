import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'home',
    title: 'Rapheal Obodugo',
    subtitle: 'Founder · Engineer · Lagos, Riyadh & London',
  });
}
