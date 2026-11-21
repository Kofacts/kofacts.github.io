import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Writing · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'writing',
    title: 'Writing',
    subtitle: 'Essays on verification, agents, history, and building',
    url: 'obodugo.online/blog',
  });
}
