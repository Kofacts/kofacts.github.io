import Link from 'next/link';
import { fetchCloudinaryPhotos } from '@/utils/cloudinary';
import { PhotosLightboxBehavior } from '@/components/ClientBehaviors';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photography · Rapheal Obodugo',
  description: 'Observations, geometry, and visual dispatches by Rapheal Obodugo',
  alternates: {
    canonical: 'https://obodugo.online/photos',
  },
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
      <main className="page-photos taste-master">
        <div className="subpage-nav">
          <Link href="/" className="profile-link">
            <span className="back-arrow">←</span>
            <img src="/ajabruwal.png" alt="" className="mini-avatar" />
            <span className="mini-name">Rapheal Obodugo</span>
          </Link>
          <span className="subpage-crumb">Photography</span>
        </div>

        <header className="page-header">
          <h1 className="page-title">Photography</h1>
          <p className="page-subtitle">Observations, geometry, and visual notes from cities and transit.</p>
          <div className="page-meta-strip">
            <span className="meta-item">Fujifilm X100VI · 23mm F2</span>
            <span className="meta-sep">·</span>
            <a
              href="https://instagram.com/h005y"
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link"
            >
              @h005y on Instagram ↗
            </a>
            <span className="meta-sep">·</span>
            <span className="meta-item">{photos.length} frames</span>
          </div>
        </header>

        {photos.length > 0 ? (
          <section className="photos-gallery-section" id="gallery">
            <div className="photos-masonry-grid">
              {photos.map((photo, i) => (
                <button
                  key={photo.id || i}
                  className="photo-frame-item gallery-item"
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
                    className="photo-img"
                  />
                </button>
              ))}
            </div>
          </section>
        ) : (
          <div className="empty-photos">
            <p>Archive loading or currently refreshing.</p>
          </div>
        )}

        <footer className="subpage-footer">
          <div className="footer-left">
            <span>Rapheal Obodugo</span>
            <span className="footer-sep">·</span>
            <span>Fujifilm X100VI</span>
          </div>
          <div className="footer-right">
            <Link href="/" className="footer-link">
              Home
            </Link>
            <span className="footer-sep">·</span>
            <Link href="/blog" className="footer-link">
              Essays
            </Link>
            <span className="footer-sep">·</span>
            <Link href="/now" className="footer-link">
              Now
            </Link>
          </div>
        </footer>
      </main>

      {/* Lightbox Component */}
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>
        <button
          className="lightbox-prev"
          id="lightboxPrev"
          type="button"
          aria-label="Previous photo"
        >
          ‹
        </button>
        <div className="lightbox-content">
          <img src="" alt="" id="lightboxImg" />
          <p className="lightbox-caption" id="lightboxCaption"></p>
        </div>
        <button className="lightbox-next" id="lightboxNext" type="button" aria-label="Next photo">
          ›
        </button>
      </div>

      <PhotosLightboxBehavior />
    </>
  );
}
