import React from 'react';
import './AboutPage.css';

const SOURCES = [
  { label: 'NASA — Science', href: 'https://science.nasa.gov/' },
  { label: 'ESA — Space Science', href: 'https://www.esa.int/Science_Exploration/Space_Science' },
  { label: 'Hubble Space Telescope', href: 'https://science.nasa.gov/mission/hubble/' },
  { label: 'James Webb Space Telescope', href: 'https://science.nasa.gov/mission/webb/' },
];

function AboutPage() {
  return (
    <main id="main-content" className="about-page" tabIndex={-1}>
      <header className="about-hero">
        <div className="container">
          <span className="about-eyebrow">Sobre o blog</span>
          <h1 className="about-title">Um blog para quem olha para cima</h1>
          <p className="about-standfirst">
            O Cosmos em Foco nasceu da vontade de contar a astronomia sem pressa, com contexto e
            com o mesmo espanto de quem vê a Via Láctea pela primeira vez.
          </p>
        </div>
      </header>

      <div className="container">
        <div className="about-layout">
          <article className="about-prose">
            <h2>Nossa missão</h2>
            <p>
              Explicar o universo com clareza, rigor e curiosidade. Cada artigo parte de uma
              pergunta real — por que os braços das galáxias não se enrolam, o que existe sob o
              gelo de Europa, como um telescópio enxerga o passado — e tenta respondê-la sem
              atalhos mágicos. A ideia é que você termine a leitura entendendo não só a resposta,
              mas também como a ciência chegou até ela.
            </p>
            <p>
              Não publicamos notícias de última hora nem prometemos descobertas definitivas. O
              foco está em textos que continuam fazendo sentido meses depois, com o cuidado de
              separar evidência de hipótese e de deixar claro o que ainda não sabemos.
            </p>

            <h2>O que você encontra aqui</h2>
            <ul>
              <li>Galáxias, matéria escura e a estrutura em larga escala do universo.</li>
              <li>Sistema Solar, luas geladas e a busca por condições de habitabilidade.</li>
              <li>Guias práticos de observação do céu e astrofotografia para iniciantes.</li>
              <li>Cosmologia, energia escura e o destino do cosmos.</li>
              <li>Tecnologia espacial, telescópios e missões que ampliam nosso olhar.</li>
            </ul>

            <h2>Como citamos fontes</h2>
            <p>
              Dados, imagens e descobertas são atribuídos às instituições responsáveis — em
              especial NASA e ESA — e, quando possível, a artigos científicos e equipes de
              missão. As imagens de capa são de domínio público ou de uso permitido, com crédito
              exibido junto à imagem. Quando uma foto é ilustrativa e não retrata exatamente o
              tema do artigo, isso fica indicado no texto alternativo e no crédito.
            </p>
            <p>
              Se você encontrar um erro, uma imprecisão ou uma fonte que mereça estar aqui,
              escreva para o time editorial. Ciência se faz em conjunto, e um blog também.
            </p>
          </article>

          <aside className="about-aside" aria-labelledby="fontes-heading">
            <h2 id="fontes-heading" className="about-aside__heading">
              Fontes que consultamos
            </h2>
            <ul className="about-sources">
              {SOURCES.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.label}
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
                      <path
                        d="M7 17L17 7M9 7h8v8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <p className="about-aside__note">
              Links externos abrem em nova aba. O Cosmos em Foco não é afiliado à NASA ou à ESA.
            </p>
          </aside>
        </div>

        <div className="about-cta">
          <a className="button button--primary" href="#/">
            Explorar os artigos
          </a>
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
