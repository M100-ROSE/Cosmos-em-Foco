import React from 'react';
import './NotFound.css';

function NotFound({
  title = 'Perdido no espaço',
  message = 'A página que você procura não existe ou foi movida para outra órbita. Volte ao início para continuar explorando.',
}) {
  return (
    <main id="main-content" className="not-found" tabIndex={-1}>
      <div className="container not-found__container">
        <div className="not-found__inner">
          <div className="not-found__orbit" aria-hidden="true">
            <span className="not-found__dot" />
          </div>

          <span className="not-found__code" aria-hidden="true">
            404
          </span>
          <h1 className="not-found__title">{title}</h1>
          <p className="not-found__text">{message}</p>

          <div className="not-found__actions">
            <a className="button button--primary" href="#/">
              Voltar ao início
            </a>
            <a className="button button--ghost" href="#/">
              Ver posts recentes
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
