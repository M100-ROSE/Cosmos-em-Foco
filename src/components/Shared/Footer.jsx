import React from 'react';
import './Footer.css';

const CATEGORY_LINKS = [
  { id: 'galaxias', label: 'Galáxias' },
  { id: 'sistema-solar', label: 'Sistema Solar' },
  { id: 'observacao', label: 'Observação' },
  { id: 'cosmologia', label: 'Cosmologia' },
  { id: 'tecnologia', label: 'Tecnologia' },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <a className="footer-brand" href="#/" aria-label="Cosmos em Foco — página inicial">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
                <path
                  d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z"
                  fill="currentColor"
                />
              </svg>
              <span>Cosmos em Foco</span>
            </a>
            <p className="footer-tagline">
              Astronomia explicada com rigor e curiosidade, do Sistema Solar às fronteiras do
              universo observável.
            </p>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Explorar</h2>
            <ul className="footer-links">
              <li>
                <a href="#/">Início</a>
              </li>
              <li>
                <a href="#/categoria/todas">Categorias</a>
              </li>
              <li>
                <a href="#/sobre">Sobre o blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Categorias</h2>
            <ul className="footer-links">
              {CATEGORY_LINKS.map((category) => (
                <li key={category.id}>
                  <a href={`#/categoria/${category.id}`}>{category.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} Cosmos em Foco</span>
          <span>Feito com curiosidade pelo cosmos</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
