/**
 * Fetch all images from a Cloudinary folder using the Admin API.
 * Called at build-time only (Astro frontmatter / static output).
 */

const CLOUD_NAME = import.meta.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = import.meta.env.CLOUDINARY_API_KEY;
const API_SECRET = import.meta.env.CLOUDINARY_API_SECRET;

/**
 * @param {string} folder - Cloudinary folder name, e.g. "kigali"
 * @returns {Promise<Array<{src: string, full: string, alt: string, width: number, height: number, id: string}>>}
 */
export async function fetchCloudinaryPhotos(folder) {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.warn('[cloudinary] Missing credentials — returning empty array');
    return [];
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/search`;
  const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

  let allResources = [];
  let nextCursor = null;

  // Paginate through all results
  do {
    const body = {
      expression: `folder:${folder} AND resource_type:image`,
      sort_by: [{ created_at: 'desc' }],
      max_results: 100,
      ...(nextCursor ? { next_cursor: nextCursor } : {}),
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(`[cloudinary] API error: ${res.status} ${res.statusText}`);
      const text = await res.text();
      console.error(text);
      return [];
    }

    const data = await res.json();
    allResources = allResources.concat(data.resources || []);
    nextCursor = data.next_cursor || null;
  } while (nextCursor);

  return allResources.map((r) => {
    const publicId = r.public_id;
    return {
      id: publicId,
      width: r.width,
      height: r.height,
      alt: r.context?.custom?.alt || r.context?.custom?.caption || '',
      // Thumbnail: 800px wide, auto quality/format
      src: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_800/${publicId}`,
      // Full-res for lightbox: 1600px wide
      full: `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_1600/${publicId}`,
    };
  });
}
