import React from 'react';
import FallbackImage from '../Shared/FallbackImage.jsx';
import { formatDate } from '../../utils/formatDate.js';
import './HeroPost.css';

export function HeroSkeleton() {
  return (
    <div className="hero-skeleton" role="status" aria-live="polite">
      <span className="sr-only">Carregando o post em destaque…</span>
      <div className="hero-skeleton__media" aria-hidden="true">
        <span className="hero-skeleton__line hero-skeleton__line--title" />
        <span className="hero-skeleton__line hero-skeleton__line--meta" />
      </div>
    </div>
  );
}

function HeroPost({ post }) {
  if (!post) return null;

  return (
    <article className="hero">
      <a
        className="hero__link"
        href={`#/post/${post.slug}`}
        aria-label={`Ler o artigo em destaque: ${post.title}`}
      >
        <div className="hero__media">
          <FallbackImage
            className="hero__img"
            src={post.imageCover}
            alt={post.imageAlt || ''}
            width={1280}
            height={720}
            loading="eager"
            fetchpriority="high"
          />
          <div className="hero__overlay" aria-hidden="true" />
        </div>

        <div className="hero__content">
          <span className="hero__eyebrow">Destaque</span>
          <h3 className="hero__title">{post.title}</h3>
          <div className="hero__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.author ? (
              <>
                <span className="hero__dot" aria-hidden="true">
                  ·
                </span>
                <span>{post.author}</span>
              </>
            ) : null}
          </div>
        </div>
      </a>
    </article>
  );
}

export default HeroPost;
