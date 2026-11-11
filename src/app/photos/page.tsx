import Link from 'next/link';
import { fetchCloudinaryPhotos } from '@/utils/cloudinary';
import { PhotosLightboxBehavior } from '@/components/ClientBehaviors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photos',
  description: 'Photography by Rapheal Obodugo',
  alternates: {
    canonical: 'https://obodugo.online/photos',
  },
  openGraph: {
    title: 'Photos · Rapheal Obodugo',
    description: 'Photography by Rapheal Obodugo',
    url: 'https://obodugo.online/photos',
  },
};

export const revalidate = 3600; // 1 hour ISR

export default async function PhotosPage() {
  const photos = await fetchCloudinaryPhotos('blog-photos');

  return (
    <>
      <main className="page-photos">
        <Link href="/" className="profile-link">
          <span className="back-arrow">←</span>
          <img src="/ajabruwal.png" alt="" className="mini-avatar" />
          <span className="mini-name">Rapheal Obodugo</span>
        </Link>

        <header>
          <div className="header-top">
            <h1>Photos</h1>
            <a
              href="https://instagram.com/h005y"
              target="_blank"
              rel="noopener noreferrer"
              className="ig-link"
            >
              @h005y
            </a>
          </div>
          <p className="subtitle">Things I see, places I go</p>
          <p className="camera">Shot on Fujifilm X100VI</p>
        </header>

        {photos.length > 0 ? (
          <section className="gallery" id="gallery">
            {photos.map((photo, i) => (
              <button
                key={photo.id || i}
                className="gallery-item"
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
          <p className="empty">Photos coming soon.</p>
        )}

        <footer>{photos.length} photos</footer>
      </main>

      {/* Lightbox */}
      <div
        className="lightbox"
        id="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <button className="lightbox-close" id="lightboxClose" type="button" aria-label="Close">
          ×
        </button>
        <a
          href="#"
          className="lightbox-download"
          id="lightboxDownload"
          aria-label="Download photo"
          title="Download High-Res"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
        <button
          className="lightbox-nav lightbox-prev"
          id="lightboxPrev"
          type="button"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <button
          className="lightbox-nav lightbox-next"
          id="lightboxNext"
          type="button"
          aria-label="Next photo"
        >
          ›
        </button>
        <div className="lightbox-img-wrap">
          <img className="lightbox-img" id="lightboxImg" src="" alt="" />
        </div>
        <p className="lightbox-caption" id="lightboxCaption"></p>
      </div>

      <PhotosLightboxBehavior />
    </>
  );
}
