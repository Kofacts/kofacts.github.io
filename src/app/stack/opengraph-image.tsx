import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Stack · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'stack',
    title: 'Stack',
    subtitle: 'Hardware, software, and systems',
    url: 'obodugo.online/stack',
  });
}
