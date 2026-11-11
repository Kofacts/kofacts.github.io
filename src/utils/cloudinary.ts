export interface CloudinaryPhoto {
  id: string;
  width: number;
  height: number;
  alt: string;
  src: string;
  full: string;
}

export async function fetchCloudinaryPhotos(folder: string): Promise<CloudinaryPhoto[]> {
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const API_KEY = process.env.CLOUDINARY_API_KEY;
  const API_SECRET = process.env.CLOUDINARY_API_SECRET;

  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.warn('[cloudinary] Missing credentials — returning empty array');
    return [];
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

  let allResources: any[] = [];
  let nextCursor: string | null = null;

  try {
    do {
      const body: Record<string, any> = {
        expression: `folder:${folder} AND resource_type:image`,
        sort_by: [{ created_at: 'desc' }],
        max_results: 100,
        ...(nextCursor ? { next_cursor: nextCursor } : {}),
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        next: { revalidate: 3600, tags: ['cloudinary'] },
      });

      if (!res.ok) {
        console.error(`[cloudinary] API error: ${res.status} ${res.statusText}`);
        return [];
      }

      const data = await res.json();
      allResources = allResources.concat(data.resources || []);
      nextCursor = data.next_cursor || null;
    } while (nextCursor);
  } catch (err) {
    console.error('[cloudinary] Fetch error:', err);
    return [];
  }

  return allResources.map((r) => {
    const publicId = r.public_id;
    return {
      id: publicId,
      width: r.width,
      height: r.height,
      alt: r.context?.custom?.alt || r.context?.custom?.caption || '',
      src: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/${publicId}`,
      full: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_1600/${publicId}`,
    };
  });
}
