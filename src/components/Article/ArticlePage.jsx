import React, { useEffect, useState } from 'react';
import ArticleBody from './ArticleBody.jsx';
import ReadingProgress from './ReadingProgress.jsx';
import FallbackImage from '../Shared/FallbackImage.jsx';
import EmptyState from '../Shared/EmptyState.jsx';
import NotFound from '../Shared/NotFound.jsx';
import PostCard from '../Posts/PostCard.jsx';
import { getPostBySlug, getRelatedPosts } from '../../services/postsApi.js';
import { formatDate } from '../../utils/formatDate.js';
import './ArticlePage.css';

const BASE_TITLE = 'Cosmos em Foco | Blog de astronomia';

function getInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function ArticleLoading() {
  return (
    <main id="main-content" className="article-page" tabIndex={-1}>
      <div className="container article-loading" role="status" aria-live="polite">
        <span className="sr-only">Carregando artigo…</span>
        <h1 className="sr-only">Carregando artigo</h1>
        <span className="article-loading__line article-loading__line--eyebrow" />
        <span className="article-loading__line article-loading__line--title" />
        <span className="article-loading__line article-loading__line--title-short" />
        <span className="article-loading__line article-loading__line--text" />
        <span className="article-loading__line article-loading__line--media" />
      </div>
    </main>
  );
}

function ArticlePage({ slug, backTo = '#/' }) {
  const [state, setState] = useState({ status: 'loading', post: null, error: null });
  const [related, setRelated] = useState([]);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let active = true;

    setState({ status: 'loading', post: null, error: null });
    setRelated([]);

    getPostBySlug(slug)
      .then((post) => {
        if (!active) return;
        if (post) {
          setState({ status: 'ready', post, error: null });
        } else {
          setState({ status: 'notfound', post: null, error: null });
        }
      })
      .catch((error) => {
        if (!active) return;
        setState({ status: 'error', post: null, error });
      });

    return () => {
      active = false;
    };
  }, [slug, retryToken]);

  useEffect(() => {
    if (state.status === 'ready' && state.post) {
      document.title = `${state.post.title} | Cosmos em Foco`;
    } else if (state.status === 'notfound') {
      document.title = 'Artigo não encontrado | Cosmos em Foco';
    } else if (state.status === 'error') {
      document.title = 'Erro ao carregar artigo | Cosmos em Foco';
    } else {
      document.title = 'Carregando artigo… | Cosmos em Foco';
    }

    return () => {
      document.title = BASE_TITLE;
    };
  }, [state.status, state.post]);

  useEffect(() => {
    if (state.status !== 'ready' || !state.post) return undefined;

    let active = true;

    getRelatedPosts(state.post.id)
      .then((items) => {
        if (active) setRelated(items);
      })
      .catch(() => {
        if (active) setRelated([]);
      });

    return () => {
      active = false;
    };
  }, [state.status, state.post]);

  if (state.status === 'loading') {
    return <ArticleLoading />;
  }

  if (state.status === 'notfound') {
    return (
      <NotFound
        title="Artigo não encontrado"
        message="Esse artigo saiu de órbita — ou nunca existiu. Volte ao início para continuar explorando o cosmos."
      />
    );
  }

  if (state.status === 'error') {
    return (
      <main id="main-content" className="article-page" tabIndex={-1}>
        <div className="container article-error">
          <h1 className="sr-only">Erro ao carregar o artigo</h1>
          <a className="article-back" href={backTo}>
            Voltar
          </a>
          <EmptyState
            title="Não foi possível carregar o artigo"
            headingLevel="h2"
            message="Houve uma falha de comunicação. Tente novamente em instantes."
            actionLabel="Tentar de novo"
            onAction={() => setRetryToken((token) => token + 1)}
          />
        </div>
      </main>
    );
  }

  const { post } = state;

  return (
    <main id="main-content" className="article-page" tabIndex={-1}>
      <ReadingProgress />

      <header className="article-hero">
        <div className="container article-hero__inner">
          <a className="article-back" href={backTo}>
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M19 12H5M11 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            Voltar
          </a>

          <nav className="breadcrumb" aria-label="Você está em">
            <ol>
              <li>
                <a href="#/">Início</a>
              </li>
              <li>
                <a href={`#/categoria/${post.category}`}>{post.categoryLabel}</a>
              </li>
              <li>
                <span aria-current="page">{post.title}</span>
              </li>
            </ol>
          </nav>

          <a className="article-category" href={`#/categoria/${post.category}`}>
            {post.categoryLabel}
          </a>

          <h1 className="article-title">{post.title}</h1>
          <p className="standfirst">{post.excerpt}</p>

          <div className="byline">
            <span className="byline__avatar" aria-hidden="true">
              {getInitials(post.author)}
            </span>
            <div className="byline__info">
              <p className="byline__author">{post.author}</p>
              <p className="byline__role">{post.authorRole}</p>
              <p className="byline__meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min de leitura</span>
              </p>
            </div>
          </div>

          <figure className="article-hero__media">
            <div className="article-hero__frame">
              <FallbackImage
                className="article-cover"
                src={post.imageCover}
                alt={post.imageAlt || ''}
                width={1280}
                height={720}
                loading="eager"
                fetchpriority="high"
              />
            </div>
            {post.imageCredit ? (
              <figcaption>Crédito: {post.imageCredit}</figcaption>
            ) : null}
          </figure>
        </div>
      </header>

      <div className="container">
        <div className="article-layout">
          <article className="prose">
            <ArticleBody content={post.content} />
          </article>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="section article-related" aria-labelledby="related-heading">
          <div className="container">
            <h2 id="related-heading" className="section-heading article-related__heading">
              Leia também
            </h2>
            <div className="post-grid">
              {related.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default ArticlePage;
