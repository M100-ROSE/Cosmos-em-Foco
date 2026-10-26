import React from 'react';
import './CategoryChips.css';

const SKELETON_CHIPS = 5;

function CategoryChips({ categories = [], selected = 'todas', onSelect, loading = false }) {
  if (loading) {
    return (
      <div className="category-chips category-chips--loading" role="status" aria-live="polite">
        <span className="sr-only">Carregando categorias…</span>
        {Array.from({ length: SKELETON_CHIPS }, (_, index) => (
          <span className="chip-skeleton" key={index} aria-hidden="true" />
        ))}
      </div>
    );
  }

  if (!categories.length) return null;

  return (
    <nav className="category-chips" aria-label="Filtrar por categoria">
      {categories.map((category) => {
        const isSelected = category.id === selected;

        return (
          <button
            key={category.id}
            type="button"
            className={`chip${isSelected ? ' chip--selected' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onSelect(category.id)}
          >
            <span>{category.label}</span>
            <span className="chip__count">{category.count}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryChips;
