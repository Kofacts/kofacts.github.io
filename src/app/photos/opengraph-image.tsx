import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Photographs · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'photos',
    title: 'Photographs',
    subtitle: 'Fujifilm X100VI · 23mm ƒ/2',
    url: 'obodugo.online/photos',
  });
}
