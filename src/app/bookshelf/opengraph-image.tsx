import { generateOGCard, OG_SIZE } from '@/utils/og';

export const alt = 'Bookshelf · Rapheal Obodugo';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return generateOGCard({
    page: 'bookshelf',
    title: 'Bookshelf',
    subtitle: 'A working library of history, epistemology, biography, systems, and literature',
    url: 'obodugo.online/bookshelf',
  });
}
