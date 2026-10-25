import React, { useState } from 'react';

const SearchBar = ({ onSearch, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
    if (isOpen) onClose();
  };
  
  return (
    <form className="search-bar bg-white/10 backdrop-filter: blur(10px) rounded-lg p-4 max-w-md mx-auto border border-white/20 transition-all duration-300" onSubmit={handleSubmit}>
      <div className="relative flex items-center gap-2">
        <svg className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.5 2.48l-7.173 7.173-1.414-1.414L20.086 6H5.414L1.5 1.5l4.586 4.586L1.414 21.486l1.414 1.414L5.414 22l3.672-3.672-4.584 4.586L18.086 19 21.5 15.5l3.586-3.586z"/>
        </svg>
        <input
          type="text"
          placeholder="Pesquisar postagens sobre o cosmos..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 py-1.5 pr-8 border-none focus:outline-none focus:ring-0"
          style="font-size: 1rem;"
          disabled={!isOpen}
        />
      </div>
      {isOpen && (
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 w-full py-2 bg-white/20 text-white text-sm font-medium rounded-md transition-colors hover:bg-white/30"
        >
          Buscar
        </button>
      )}
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar busca"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6l-12 12m0-12l12 12"/>
          </svg>
        </button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isRequired: PropTypes.bool.isRequired,
  onClose: PropTypes.func
};

export default SearchBar;