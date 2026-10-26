import React, { useEffect, useRef } from 'react';
import './SearchBar.css';

function SearchIcon() {
  return (
    <svg
      className="search-bar__icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SearchBar({
  id,
  value,
  onChange,
  onSubmit,
  onClose,
  autoFocus = false,
  variant = 'default',
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  const handleClear = () => {
    onChange('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();

    if (variant === 'mobile' && onClose) {
      onClose();
      return;
    }

    if (value) {
      onChange('');
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <form
      className={`search-bar search-bar--${variant}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <label className="sr-only" htmlFor={id}>
        Buscar posts
      </label>

      <div className="search-bar__field">
        <SearchIcon />
        <input
          ref={inputRef}
          id={id}
          className="search-bar__input"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar no cosmos…"
          autoComplete="off"
          enterKeyHint="search"
        />
        {value ? (
          <button
            type="button"
            className="search-bar__clear"
            aria-label="Limpar busca"
            onClick={handleClear}
          >
            <ClearIcon />
          </button>
        ) : null}
      </div>

      <button type="submit" className="search-bar__submit">
        Buscar
      </button>

      {onClose ? (
        <button
          type="button"
          className="search-bar__close"
          aria-label="Fechar busca"
          onClick={onClose}
        >
          <ClearIcon />
        </button>
      ) : null}
    </form>
  );
}

export default SearchBar;
