import React, { useState } from 'react';

const Header = ({ searchOpen, onSearch, onClose }) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  
  const handleSearchToggle = () => setIsSearchBarOpen(true);
  const handleClose = () => {
    setSearchOpen(false);
    setIsSearchBarOpen(false);
  };
  
  const handleSearchInputBlur = () => {
    setIsSearchBarOpen(false);
    setTimeout(() => onClose(), 150);
  };

  return (
    <header 
      className="header flex items-center justify-between px-4 sm:px-6 h-20 sm:h-16 border-b border-gray-200/50 bg-gradient-to-b from-[var(--night-deep)] to-[var(--night-medium)] backdrop-filter: blur(20px) -webkit-backdrop-filter: blur(20px)"
    >
      <div className="flex items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-[var(--white-primary)]">
          Cosmos em Foco
        </h1>
        <button 
          onClick={handleSearchToggle}
          className="relative p-2 rounded-md hover:bg-[rgba(169,127,255,0.1)] transition-colors sm:hidden"
          aria-label="Buscar posts"
        >
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.5 2.48l-7.173 7.173-1.414-1.414L20.086 6H5.414L1.5 1.5l4.586 4.586L1.414 21.486l1.414 1.414L5.414 22l3.672-3.672-4.584 4.586L18.086 19 21.5 15.5l3.586-3.586z"/>
          </svg>
        </button>
      </div>
      
      {/* Barra de busca - aparece quando toggled */}
      {isSearchBarOpen && (
        <div className="absolute right-0 top-full w-full max-w-sm mt-2 sm:w-64 bg-white/10 backdrop-filter: blur(10px) rounded-lg px-4 py-2 shadow-lg transform transition-transform duration-200 ease-in-out" style="box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          <div className="relative flex items-center gap-2">
            <svg className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.5 2.48l-7.173 7.173-1.414-1.414L20.086 6H5.414L1.5 1.5l4.586 4.586L1.414 21.486l1.414 1.414L5.414 22l3.672-3.672-4.584 4.586L18.086 19 21.5 15.5l3.586-3.586z"/>
            </svg>
            <input
              type="text"
              placeholder="Pesquisar postagens sobre o cosmos..."
              onBlur={handleSearchInputBlur}
              className="w-full bg-transparent outline-none placeholder-gray-500 text-white py-2 pr-8"
              style="font-size: 0.875rem;"
            />
            <span className="absolute right-3 text-gray-400 text-sm">Enter para buscar</span>
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar busca"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 6l-12 12m0-12l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <nav className="hidden sm:flex items-center gap-6">
        <a 
          href="#"
          className="text-[var(--celeste-soft)] hover:text-[var(--nebula-purple)] transition-colors font-medium"
        >
          Home
        </a>
        <a 
          href="#"
          className="text-[var(--celeste-soft)] hover:text-[var(--nebula-purple)] transition-colors font-medium"
        >
          Categorias
        </a>
        <a 
          href="#"
          className="text-[var(--celeste-soft)] hover:text-[var(--nebula-purple)] transition-colors font-medium"
        >
          Sobre
        </a>
      </nav>
    </header>
  );
};

export default Header;