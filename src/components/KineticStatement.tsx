'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  lead?: string;
}

export function KineticStatement({ text, lead }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When top of element enters at 85% of viewport to when bottom leaves at 40%
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.35;
      
      const current = start - rect.top;
      const total = start - end + rect.height;
      const p = Math.max(0, Math.min(1, current / total));
      
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = text.split(/\s+/).filter(Boolean);
  const activeWordCount = Math.round(progress * words.length);

  return (
    <div ref={containerRef} className="kinetic-statement-wrap">
      {lead && <span className="kinetic-lead">{lead}</span>}
      <p className="kinetic-text">
        {words.map((word, idx) => {
          const isActive = idx < activeWordCount;
          return (
            <span
              key={idx}
              className={`kinetic-word ${isActive ? 'is-active' : ''}`}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}
