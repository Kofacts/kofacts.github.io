import Link from 'next/link';
import { fetchCloudinaryPhotos } from '@/utils/cloudinary';
import { PhotosLightboxBehavior } from '@/components/ClientBehaviors';
import { TfHeader, TfRow, TfFooter } from '@/components/TfShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photography · Rapheal Obodugo',
  description: 'Observations, geometry, and visual dispatches by Rapheal Obodugo',
  alternates: { canonical: 'https://obodugo.online/photos' },
  openGraph: {
    title: 'Photography · Rapheal Obodugo',
    description: 'Observations, geometry, and visual dispatches by Rapheal Obodugo',
    url: 'https://obodugo.online/photos',
  },
};

export const revalidate = 3600; // 1 hour ISR

export default async function PhotosPage() {
  const photos = await fetchCloudinaryPhotos('blog-photos');

  return (
    <>
      <main className="tf tf-photos">
        <TfHeader
          title="Photographs"
          sub={
            <>
              Fujifilm X100VI, 23mm f/2. {photos.length} frames.{' '}
              <a href="https://instagram.com/h005y">@h005y ↗</a>
            </>
          }
        />

        {photos.length > 0 ? (
          <section className="tf-gallery" id="gallery">
            {photos.map((photo, i) => (
              <button
                key={photo.id || i}
                className="tf-photo gallery-item"
                data-full={photo.full}
                data-alt={photo.alt}
                data-index={i}
                type="button"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </button>
            ))}
          </section>
        ) : (
          <TfRow label="">
            <p className="tf-dim">Archive loading or currently refreshing.</p>
          </TfRow>
        )}

        <TfFooter note="Shot on Fujifilm X100VI. All images © Rapheal Obodugo." />
      </main>

      {/* Lightbox */}
      <div className="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
        <button className="lightbox-close" id="lightboxClose" type="button" aria-label="Close">×</button>
        <a href="#" className="lightbox-download" id="lightboxDownload" aria-label="Download photo" title="Download">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <button className="lightbox-prev" id="lightboxPrev" type="button" aria-label="Previous">‹</button>
        <div className="lightbox-content">
          <img src="" alt="" id="lightboxImg" />
          <p className="lightbox-caption" id="lightboxCaption"></p>
        </div>
        <button className="lightbox-next" id="lightboxNext" type="button" aria-label="Next">›</button>
      </div>
      <PhotosLightboxBehavior />
    </>
  );
}
