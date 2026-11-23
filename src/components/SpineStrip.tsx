'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export interface SpineBook {
  domId: string;
  title: string;
  author: string;
  rating: number;
  letter: string;
}

interface SpineStripProps {
  books: SpineBook[];
}

export function SpineStrip({ books }: SpineStripProps) {
  const [activeBook, setActiveBook] = useState<SpineBook | null>(null);
  const [tooltipX, setTooltipX] = useState<number>(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isHoveringSpines = useRef(false);

  const updateTooltipPosition = useCallback((targetEl: HTMLElement, book: SpineBook) => {
    if (!wrapRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    
    // Center point of the bar relative to wrap container
    const rawX = targetRect.left - wrapRect.left + targetRect.width / 2;
    
    // Clamp so the tooltip stays within container boundaries
    const minX = 90;
    const maxX = Math.max(minX, wrapRect.width - 90);
    const clampedX = Math.max(minX, Math.min(maxX, rawX));
    
    setTooltipX(clampedX);
    setActiveBook(book);
  }, []);

  const handleJump = (domId: string) => {
    const el = document.getElementById(domId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Trigger visual pulse highlight on the target book entry
    el.classList.remove('tf-entry-pulse');
    // Force DOM reflow to restart CSS animation
    void el.offsetWidth;
    el.classList.add('tf-entry-pulse');

    setTimeout(() => {
      el.classList.remove('tf-entry-pulse');
    }, 2000);
  };

  // Bi-directional link: hovering a book in the register highlights its spine
  useEffect(() => {
    const entries = document.querySelectorAll<HTMLElement>('.tf-entry[data-spine-id]');
    const cleanups: (() => void)[] = [];

    entries.forEach((entry) => {
      const spineId = entry.getAttribute('data-spine-id');
      if (!spineId) return;

      const onEnter = () => {
        if (isHoveringSpines.current) return;
        const spine = document.getElementById(spineId);
        spine?.classList.add('is-reverse-active');
      };

      const onLeave = () => {
        const spine = document.getElementById(spineId);
        spine?.classList.remove('is-reverse-active');
      };

      entry.addEventListener('mouseenter', onEnter);
      entry.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        entry.removeEventListener('mouseenter', onEnter);
        entry.removeEventListener('mouseleave', onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [books]);

  return (
    <div
      className="tf-spines-wrap"
      ref={wrapRef}
      onMouseEnter={() => { isHoveringSpines.current = true; }}
      onMouseLeave={() => {
        isHoveringSpines.current = false;
        setActiveBook(null);
      }}
    >
      {/* Floating tooltip */}
      {activeBook && (
        <div
          className="tf-spine-tooltip"
          style={{ left: `${tooltipX}px` }}
          role="tooltip"
          aria-hidden="true"
        >
          <span className="tf-spine-tt-letter">{activeBook.letter}</span>
          <span className="tf-spine-tt-title">{activeBook.title}</span>
          <span className="tf-spine-tt-dash"> — </span>
          <span className="tf-spine-tt-author">{activeBook.author}</span>
          {activeBook.rating > 0 && (
            <span className="tf-spine-tt-stars">
              {'★'.repeat(activeBook.rating)}
            </span>
          )}
        </div>
      )}

      {/* Interactive spine bar strip */}
      <div
        className="tf-spines"
        role="region"
        aria-label="Bibliographic spine catalog navigation"
      >
        {books.map((b) => (
          <button
            key={b.domId}
            id={`spine-${b.domId}`}
            type="button"
            className={`tf-spine ${activeBook?.domId === b.domId ? 'is-active' : ''}`}
            style={{
              width: `${Math.max(3, Math.min(8, (b.title.length % 6) + 3))}px`,
            }}
            title={`${b.title} by ${b.author} (click to jump)`}
            aria-label={`${b.title} by ${b.author}. Click to jump to catalog entry.`}
            onClick={() => handleJump(b.domId)}
            onMouseEnter={(e) => updateTooltipPosition(e.currentTarget, b)}
            onFocus={(e) => updateTooltipPosition(e.currentTarget, b)}
            onBlur={() => setActiveBook(null)}
          />
        ))}
      </div>
    </div>
  );
}
