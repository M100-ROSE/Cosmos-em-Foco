import React from 'react';
import FallbackImage from '../Shared/FallbackImage.jsx';
import { formatDate } from '../../utils/formatDate.js';
import './PostCard.css';

function CalendarIcon() {
  return (
    <svg
      className="post-card__meta-icon"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M3 11h18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PostCard({ post }) {
  if (!post) return null;

  return (
    <article className="post-card">
      <a className="post-card__link" href={`#/post/${post.slug}`}>
        <figure className="post-card__media">
          <FallbackImage
            className="post-card__img"
            src={post.imageCover}
            alt={post.imageAlt || ''}
            width={640}
            height={360}
            loading="lazy"
            sizes="(min-width: 1280px) 25vw, (min-width: 1025px) 33vw, (min-width: 641px) 50vw, 100vw"
          />
        </figure>

        <div className="post-card__body">
          {post.categoryLabel ? (
            <span className="post-card__eyebrow">{post.categoryLabel}</span>
          ) : null}

          <h3 className="post-card__title">{post.title}</h3>

          <div className="post-card__meta">
            <CalendarIcon />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author ? (
              <>
                <span className="post-card__dot" aria-hidden="true">
                  ·
                </span>
                <span>{post.author}</span>
              </>
            ) : null}
          </div>

          {post.excerpt ? <p className="post-card__excerpt">{post.excerpt}</p> : null}

          <span className="post-card__cta">
            Ler artigo
            <ArrowIcon />
          </span>
        </div>
      </a>
    </article>
  );
}

export default PostCard;
