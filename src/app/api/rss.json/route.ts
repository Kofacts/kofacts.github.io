import { NextResponse } from 'next/server';
import { fetchRSSPosts } from '@/utils/rss';

export const revalidate = 900;

export async function GET() {
  try {
    const posts = await fetchRSSPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
  }
}
