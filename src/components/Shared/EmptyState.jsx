import React from 'react';
import './EmptyState.css';

function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  secondaryHref,
  headingLevel = 'h3',
}) {
  const Heading = headingLevel;

  return (
    <div className="empty-state" role="status">
      <svg viewBox="0 0 56 56" width="56" height="56" aria-hidden="true" focusable="false">
        <circle cx="28" cy="28" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse
          cx="28"
          cy="28"
          rx="25"
          ry="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          transform="rotate(-24 28 28)"
        />
        <circle cx="46" cy="16" r="1.8" fill="currentColor" />
        <circle cx="10" cy="40" r="1.2" fill="currentColor" />
      </svg>

      <Heading className="empty-state__title">{title}</Heading>
      {message ? <p className="empty-state__text">{message}</p> : null}

      {actionLabel || secondaryLabel ? (
        <div className="empty-state__actions">
          {actionLabel ? (
            <button type="button" className="button button--primary" onClick={onAction}>
              {actionLabel}
            </button>
          ) : null}

          {secondaryLabel && secondaryHref ? (
            <a className="empty-state__secondary" href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default EmptyState;
