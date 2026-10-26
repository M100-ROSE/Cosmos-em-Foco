import React from 'react';
import PostCard from './PostCard.jsx';
import SkeletonCard from './SkeletonCard.jsx';
import EmptyState from '../Shared/EmptyState.jsx';
import './PostGrid.css';

const SKELETON_COUNT = 4;

function PostGrid({
  items = [],
  loading = false,
  page = 1,
  error = null,
  hasMore = false,
  onLoadMore,
  onRetry,
  onClearFilters,
  emptyTitle = 'Nenhum post encontrado',
  emptyMessage = 'Tente outra palavra-chave ou remova os filtros.',
}) {
  if (error && items.length === 0) {
    return (
      <div className="post-grid__error" role="alert">
        <svg
          className="post-grid__error-icon"
          viewBox="0 0 24 24"
          width="40"
          height="40"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v6" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="17" r="1.2" fill="currentColor" />
        </svg>
        <h3 className="post-grid__error-title">Não foi possível carregar os posts</h3>
        <p className="post-grid__error-text">Houve uma falha de comunicação com o cosmos. Tente novamente.</p>
        <button type="button" className="button button--primary" onClick={onRetry}>
          Tentar de novo
        </button>
      </div>
    );
  }

  if (loading && page === 1) {
    return (
      <div className="post-grid" role="status" aria-live="polite">
        <span className="sr-only">Carregando posts…</span>
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel="Limpar filtros"
        onAction={onClearFilters}
      />
    );
  }

  return (
    <>
      <div className="post-grid">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {error ? (
        <div className="post-grid__error post-grid__error--inline" role="alert">
          <p>Não foi possível carregar mais artigos.</p>
          <button type="button" className="button button--ghost" onClick={onRetry}>
            Tentar de novo
          </button>
        </div>
      ) : null}

      {hasMore && !error ? (
        <div className="post-grid__footer">
          <button
            type="button"
            className="button button--ghost"
            onClick={onLoadMore}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Carregando…' : 'Carregar mais'}
          </button>
        </div>
      ) : null}
    </>
  );
}

export default PostGrid;
