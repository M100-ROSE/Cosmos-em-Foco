import React, { useCallback, useEffect, useRef, useState } from 'react';

import Header from './components/Header/Header.jsx';
import Footer from './components/Shared/Footer.jsx';
import NotFound from './components/Shared/NotFound.jsx';
import ArticlePage from './components/Article/ArticlePage.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import { parseRoute, useHashRoute } from './hooks/useHashRoute.js';
import { CATEGORY_LABELS } from './data/categories.js';

const BASE_TITLE = 'Cosmos em Foco | Blog de astronomia';

function App() {
  const { path, route, navigate } = useHashRoute();
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const [previousRoute, setPreviousRoute] = useState(null);
  const currentRouteRef = useRef(null);

  useEffect(() => {
    const previous = currentRouteRef.current;
    currentRouteRef.current = parseRoute(path);

    if (previous) {
      setPreviousRoute(previous);
    }
  }, [path]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setQuery(searchTerm.trim());
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    if (route.name === 'home') {
      document.title = BASE_TITLE;
    } else if (route.name === 'category') {
      const label =
        route.category === 'todas'
          ? 'Todas as categorias'
          : CATEGORY_LABELS[route.category] || route.category;
      document.title = `${label} | Cosmos em Foco`;
    } else if (route.name === 'about') {
      document.title = 'Sobre o blog | Cosmos em Foco';
    } else if (route.name === 'notfound') {
      document.title = 'Página não encontrada | Cosmos em Foco';
    }
  }, [route.name, route.category]);

  const handleSearchSubmit = useCallback(
    (value) => {
      setSearchTerm(value);
      setQuery(value.trim());

      if (route.name !== 'home' && route.name !== 'category') {
        navigate('/');
      }
    },
    [navigate, route.name],
  );

  const handleCategorySelect = useCallback(
    (categoryId) => {
      if (categoryId === 'todas') {
        navigate('/');
      } else {
        navigate(`/categoria/${categoryId}`);
      }
    },
    [navigate],
  );

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setQuery('');
    navigate('/');
  }, [navigate]);

  const handleSkipToContent = (event) => {
    event.preventDefault();
    const main = document.getElementById('main-content');
    if (main) main.focus();
  };

  const backTo =
    previousRoute && previousRoute.name === 'category'
      ? `#/categoria/${previousRoute.category}`
      : '#/';

  let content = null;

  if (route.name === 'home' || route.name === 'category') {
    content = (
      <HomePage
        categoryId={route.name === 'category' ? route.category : 'todas'}
        query={query}
        onCategorySelect={handleCategorySelect}
        onClearFilters={handleClearFilters}
      />
    );
  } else if (route.name === 'post') {
    content = <ArticlePage slug={route.slug} backTo={backTo} />;
  } else if (route.name === 'about') {
    content = <AboutPage />;
  } else {
    content = <NotFound />;
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main-content" onClick={handleSkipToContent}>
        Pular para o conteúdo
      </a>

      <Header
        routeName={route.name}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />

      {content}

      <Footer />
    </div>
  );
}

export default App;
