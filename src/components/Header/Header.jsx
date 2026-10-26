import React, { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../Search/SearchBar.jsx';
import './Header.css';

function StarIcon() {
  return (
    <svg
      className="site-header__star"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Header({ routeName, searchTerm, onSearchChange, onSearchSubmit }) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  const closeSearch = useCallback((restoreFocus = true) => {
    setMobileSearchOpen(false);
    if (restoreFocus && toggleRef.current) {
      toggleRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!mobileSearchOpen) return undefined;

    const handlePointerDown = (event) => {
      const clickedPanel = panelRef.current && panelRef.current.contains(event.target);
      const clickedToggle = toggleRef.current && toggleRef.current.contains(event.target);
      if (!clickedPanel && !clickedToggle) {
        setMobileSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearch(true);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileSearchOpen, closeSearch]);

  const handleMobileSubmit = (value) => {
    onSearchSubmit(value);
    closeSearch(true);
  };

  const isHome = routeName === 'home';
  const isCategory = routeName === 'category';
  const isAbout = routeName === 'about';

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__brand" href="#/" aria-label="Cosmos em Foco — página inicial">
          <StarIcon />
          <span>Cosmos em Foco</span>
        </a>

        <nav className="site-header__nav" aria-label="Navegação principal">
          <a
            className={`nav-link${isHome ? ' nav-link--active' : ''}`}
            href="#/"
            aria-current={isHome ? 'page' : undefined}
          >
            Início
          </a>
          <a
            className={`nav-link${isCategory ? ' nav-link--active' : ''}`}
            href="#/categoria/todas"
            aria-current={isCategory ? 'page' : undefined}
          >
            Categorias
          </a>
          <a
            className={`nav-link${isAbout ? ' nav-link--active' : ''}`}
            href="#/sobre"
            aria-current={isAbout ? 'page' : undefined}
          >
            Sobre
          </a>
        </nav>

        <div className="site-header__actions">
          <SearchBar
            id="busca-desktop"
            variant="header"
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
          />

          <button
            ref={toggleRef}
            type="button"
            className="search-toggle"
            aria-label="Buscar posts"
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search-panel"
            onClick={() => setMobileSearchOpen((open) => !open)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="mobile-search" id="mobile-search-panel" ref={panelRef}>
          <div className="container mobile-search__inner">
            <SearchBar
              id="busca-mobile"
              variant="mobile"
              value={searchTerm}
              onChange={onSearchChange}
              onSubmit={handleMobileSubmit}
              onClose={() => closeSearch(true)}
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
