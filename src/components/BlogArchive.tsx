'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Post } from '@/utils/rss';

interface Props {
  posts: Post[];
}

export function getCategory(slug: string, title: string): string {
  const s = `${slug} ${title}`.toLowerCase();
  if (
    s.includes('avae') ||
    s.includes('eristic') ||
    s.includes('ouroboros') ||
    s.includes('machine') ||
    s.includes('reliability') ||
    s.includes('idea-factory')
  ) {
    return 'Systems & AI';
  }
  if (
    s.includes('apology') ||
    s.includes('books') ||
    s.includes('prodigy') ||
    s.includes('review')
  ) {
    return 'Books & Notes';
  }
  if (
    s.includes('cogito') ||
    s.includes('priest') ||
    s.includes('belief') ||
    s.includes('morality') ||
    s.includes('decadence') ||
    s.includes('exclusion') ||
    s.includes('subordinate') ||
    s.includes('ulo-uche') ||
    s.includes('nuance')
  ) {
    return 'Epistemology';
  }
  return 'Reflections';
}

export function getReadingTime(content: string, description: string): string {
  const text = (content || description || '').replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

export function cleanDescription(desc: string, maxLen = 135): string {
  if (!desc) return '';
  const clean = desc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + '…';
}

const CATEGORIES = ['All', 'Systems & AI', 'Epistemology', 'Reflections', 'Books & Notes'] as const;

export function BlogArchive({ posts }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  const featuredPost = posts[0] || null;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const category = getCategory(post.slug, post.title);
      const matchesCategory = activeCategory === 'All' || category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div className="taste-blog-archive">
      {/* Featured Essay Card (House Rule 3: Cadence & Featured Dossier) */}
      {featuredPost && activeCategory === 'All' && !searchQuery.trim() && (
        <section className="featured-section">
          <div className="section-label">LATEST ESSAY</div>
          <Link href={`/blog/${featuredPost.slug}/`} className="featured-card">
            <div className="featured-header">
              <span className="featured-pill">
                {getCategory(featuredPost.slug, featuredPost.title)}
              </span>
              <span className="featured-meta">
                {formatDate(featuredPost.date)} · {getReadingTime(featuredPost.content, featuredPost.description)}
              </span>
            </div>
            <h2 className="featured-title">{featuredPost.title}</h2>
            <p className="featured-excerpt">
              {cleanDescription(featuredPost.description, 160)}
            </p>
            <div className="featured-footer">
              <span className="read-action">
                Read essay <span className="arrow">→</span>
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Filter and Search Bar (House Rule 5: Tactile Micro-Interactions) */}
      <div className="archive-controls">
        <div className="category-pills" role="tablist">
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? posts.length
                : posts.filter((p) => getCategory(p.slug, p.title) === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                role="tab"
                aria-selected={isActive}
              >
                <span>{cat}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search essays..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search essays"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Archive List */}
      <div className="archive-list-wrap">
        <div className="archive-count-row">
          <span className="archive-status">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'essay' : 'essays'}
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="no-results">
            <p>No essays found matching your criteria.</p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <ul className="archive-posts">
            {filteredPosts.map((post) => {
              const category = getCategory(post.slug, post.title);
              const readingTime = getReadingTime(post.content, post.description);
              const excerpt = cleanDescription(post.description, 110);

              return (
                <li key={post.slug} className="archive-item">
                  <Link href={`/blog/${post.slug}/`} className="archive-link">
                    <div className="item-main">
                      <div className="item-title-row">
                        <span className="item-title">{post.title}</span>
                      </div>
                      {excerpt && <p className="item-excerpt">{excerpt}</p>}
                    </div>

                    <div className="item-meta">
                      <span className="item-category">{category}</span>
                      <span className="item-dot">·</span>
                      <span className="item-time">{readingTime}</span>
                      <span className="item-dot">·</span>
                      <time className="item-date">{formatDate(post.date)}</time>
                      <span className="item-arrow">↗</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
