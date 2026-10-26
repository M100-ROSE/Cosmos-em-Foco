import React, { useEffect, useState } from 'react';
import HeroPost, { HeroSkeleton } from '../components/Posts/HeroPost.jsx';
import PostGrid from '../components/Posts/PostGrid.jsx';
import CategoryChips from '../components/Category/CategoryChips.jsx';
import { usePosts } from '../hooks/usePosts.js';
import { getCategories, getFeaturedPost } from '../services/postsApi.js';
import './HomePage.css';

const formatCategoryName = (id) =>
  decodeURIComponent(String(id || ''))
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

function HomePage({ categoryId, query, onCategorySelect, onClearFilters }) {
  const category = categoryId || 'todas';
  const isCategoryPage = category !== 'todas';
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [featured, setFeatured] = useState(null);
  const [featuredStatus, setFeaturedStatus] = useState('loading');

  const { items, total, page, loading, error, hasMore, loadMore, retry } = usePosts({
    query,
    category,
  });

  useEffect(() => {
    let active = true;

    setCategoriesLoading(true);
    getCategories()
      .then((list) => {
        if (!active) return;
        setCategories(list);
        setCategoriesLoading(false);
      })
      .catch(() => {
        if (!active) return;
        setCategories([]);
        setCategoriesLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isCategoryPage) {
      setFeatured(null);
      setFeaturedStatus('idle');
      return undefined;
    }

    let active = true;
    setFeaturedStatus('loading');

    getFeaturedPost()
      .then((post) => {
        if (!active) return;
        setFeatured(post);
        setFeaturedStatus(post ? 'ready' : 'empty');
      })
      .catch(() => {
        if (!active) return;
        setFeatured(null);
        setFeaturedStatus('empty');
      });

    return () => {
      active = false;
    };
  }, [isCategoryPage]);

  const activeCategory = categories.find((item) => item.id === category);
  const pageLabel = activeCategory ? activeCategory.label : formatCategoryName(category);
  const countLabel = total === 1 ? 'artigo' : 'artigos';

  return (
    <main id="main-content" className="home-page" tabIndex={-1}>
      {!isCategoryPage ? (
        <>
          <h1 className="sr-only">Cosmos em Foco — astronomia para curiosos</h1>

          {featuredStatus !== 'empty' ? (
            <section className="section home-hero-section" aria-labelledby="destaque-heading">
              <div className="container">
                <div className="section-heading-row">
                  <h2 id="destaque-heading" className="section-heading">
                    Em destaque
                  </h2>
                </div>

                {featuredStatus === 'loading' ? <HeroSkeleton /> : null}
                {featuredStatus === 'ready' && featured ? <HeroPost post={featured} /> : null}
              </div>
            </section>
          ) : null}
        </>
      ) : (
        <header className="page-hero">
          <div className="container">
            <span className="page-hero__eyebrow">Categoria</span>
            <h1 className="page-hero__title">{pageLabel}</h1>
            <p className="page-hero__text">
              Artigos publicados sobre {pageLabel.toLowerCase()}, sempre com fontes e contexto.
            </p>
          </div>
        </header>
      )}

      <section className="section home-categories-section" aria-labelledby="categorias-heading">
        <div className="container">
          <h2 id="categorias-heading" className="section-heading home-categories-heading">
            Explore por categoria
          </h2>
          <CategoryChips
            categories={categories}
            selected={category}
            onSelect={onCategorySelect}
            loading={categoriesLoading}
          />
        </div>
      </section>

      <section className="section home-posts-section" aria-labelledby="artigos-heading">
        <div className="container">
          <div className="section-heading-row">
            <h2 id="artigos-heading" className="section-heading">
              {isCategoryPage ? `Artigos em ${pageLabel}` : 'Últimos artigos'}
            </h2>
            {!loading && !error ? (
              <p className="results-count" aria-live="polite">
                {total} {countLabel}
              </p>
            ) : null}
          </div>

          {query ? (
            <p className="results-query">
              Resultados para <strong>“{query}”</strong>
            </p>
          ) : null}

          <PostGrid
            items={items}
            loading={loading}
            page={page}
            error={error}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onRetry={retry}
            onClearFilters={onClearFilters}
            emptyTitle="Nenhum post encontrado"
            emptyMessage="Tente outra palavra-chave ou remova os filtros."
          />
        </div>
      </section>
    </main>
  );
}

export default HomePage;
