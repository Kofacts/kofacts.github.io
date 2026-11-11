'use client';

import { useEffect } from 'react';

export function HomeClientBehavior() {
  useEffect(() => {
    const header = document.querySelector('header');
    const stickyHeader = document.getElementById('stickyHeader');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          stickyHeader?.classList.add('visible');
        } else {
          stickyHeader?.classList.remove('visible');
        }
      },
      { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
    );

    if (header) observer.observe(header);

    const timeEl = document.getElementById('londonTime');
    const updateTime = () => {
      if (!timeEl) return;
      const now = new Date();
      const london = now.toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      timeEl.textContent = `${london} London`;
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);

    const avatar = document.querySelector('.avatar') as HTMLElement | null;
    const progressBar = document.getElementById('scrollProgress');

    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (progressBar && docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }

      if (avatar) {
        avatar.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      clearInterval(interval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}

export function ScrollProgressBehavior() {
  useEffect(() => {
    const progressBar = document.getElementById('scrollProgress');
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBar && docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}

export function PhotosLightboxBehavior() {
  useEffect(() => {
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg') as HTMLImageElement | null;
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxDownload = document.getElementById('lightboxDownload') as HTMLAnchorElement | null;
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    const items = Array.from(gallery?.querySelectorAll('.gallery-item') || []) as HTMLButtonElement[];
    let currentIndex = 0;

    function openLightbox(index: number) {
      const item = items[index];
      if (!item) return;
      currentIndex = index;
      const full = item.dataset.full || '';
      const alt = item.dataset.alt || '';
      if (lightboxImg) {
        lightboxImg.src = full;
        lightboxImg.alt = alt;
      }
      if (lightboxCaption) lightboxCaption.textContent = alt;
      if (lightboxDownload) {
        lightboxDownload.href = full.replace('/upload/', '/upload/fl_attachment/');
      }
      lightbox?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox?.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => {
        if (lightboxImg) lightboxImg.src = '';
      }, 300);
    }

    function navigate(dir: number) {
      if (items.length === 0) return;
      currentIndex = (currentIndex + dir + items.length) % items.length;
      openLightbox(currentIndex);
    }

    const clickHandlers = items.map((item, i) => {
      const fn = () => openLightbox(i);
      item.addEventListener('click', fn);
      return { item, fn };
    });

    const onPrev = () => navigate(-1);
    const onNext = () => navigate(1);
    const onBackdrop = (e: MouseEvent) => {
      if (e.target === lightbox || (e.target as HTMLElement).classList.contains('lightbox-img-wrap')) {
        closeLightbox();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (!lightbox?.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxPrev?.addEventListener('click', onPrev);
    lightboxNext?.addEventListener('click', onNext);
    lightbox?.addEventListener('click', onBackdrop);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      clickHandlers.forEach(({ item, fn }) => item.removeEventListener('click', fn));
      lightboxClose?.removeEventListener('click', closeLightbox);
      lightboxPrev?.removeEventListener('click', onPrev);
      lightboxNext?.removeEventListener('click', onNext);
      lightbox?.removeEventListener('click', onBackdrop);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
