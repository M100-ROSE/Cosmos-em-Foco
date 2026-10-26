import React from 'react';

function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__media" />
      <div className="skeleton-card__body">
        <span className="skeleton-line skeleton-line--eyebrow" />
        <span className="skeleton-line skeleton-line--title" />
        <span className="skeleton-line skeleton-line--title-short" />
        <span className="skeleton-line skeleton-line--meta" />
        <span className="skeleton-line skeleton-line--excerpt" />
        <span className="skeleton-line skeleton-line--excerpt" />
        <span className="skeleton-line skeleton-line--excerpt-short" />
      </div>
    </div>
  );
}

export default SkeletonCard;
