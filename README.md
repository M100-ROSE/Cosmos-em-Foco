# Cosmos em Foco

Blog de astronomia em português, com visual de "aconchego cósmico": fundo escuro
estrelado, tipografia editorial (serifada nos títulos) e cards claros em destaque.
O conteúdo é editorial — 9 reportagens longas sobre galáxias, Sistema Solar,
observação do céu, cosmologia e tecnologia espacial — servido por uma API simulada
que pode ser trocada por uma real sem mexer nos componentes.

Interface em **React 18** (Create React App 5), **CSS puro com custom properties** e
**zero dependências de UI**.

---

## Funcionalidades

- **Home** com matéria em destaque (hero), chips de categoria, busca e grade de cards.
- **Busca** com debounce de 300 ms, sem diferenciar maiúsculas/minúsculas nem acentos
  (digitar "galaxias" encontra "Galáxias").
- **Filtro por categoria** com contagem real de artigos por seção, e estado combinado
  de busca + categoria (com "limpar filtros").
- **Paginação incremental** — botão "Carregar mais" (6 artigos por página).
- **Página de artigo** com breadcrumb, byline, barra de progresso de leitura,
  renderização de blocos (parágrafo, subtítulo, citação, lista) e "Leia também".
- **Estados completos de UI**: carregamento com skeletons, lista vazia, erro de
  requisição com "tentar novamente" e rota 404.
- **Roteamento por hash** (`#/`, `#/post/:slug`, `#/categoria/:id`, `#/sobre`) escrito
  à mão, sem `react-router` — funciona em qualquer hospedagem estática, inclusive
  GitHub Pages, sem regra de rewrite no servidor.
- **`document.title` por rota**, para histórico e abas corretas.
- **Imagens externas com fallback**: se a foto da NASA não carregar, um bloco de
  gradiente cósmico assume o lugar preservando o `alt`.
- **Acessibilidade**: skip link, foco visível, `aria-pressed` nos chips, landmarks,
  contraste AA e respeito a `prefers-reduced-motion`.

## Stack

| Camada | Escolha |
| --- | --- |
| Aplicação | React 18 + Create React App 5 (`react-scripts`) |
| Estilo | CSS puro, um arquivo por componente + `src/styles/tokens.css` (custom properties) |
| Roteamento | hash routing próprio (`src/hooks/useHashRoute.js`) |
| Dados | módulos ESM estáticos + API assíncrona simulada (`src/services/postsApi.js`) |
| Ícones | SVG inline |
| Fontes | Playfair Display e Inter via Google Fonts (`public/index.html`) |

Sem Tailwind, sem biblioteca de componentes, sem PropTypes e sem `type: module` no
`package.json`.

## Como rodar

Requisito: Node 18+ (funciona com Node 20/22; aparece um aviso `DEP0176` do próprio
Node sobre `fs.F_OK`, vindo do `react-scripts`, não do app).

```bash
npm install
npm start          # http://localhost:3000
npm run build      # build de produção em build/
npm test           # runner do CRA (nenhum teste escrito ainda)
```

Build atual: **71,03 kB de JS** e **7,66 kB de CSS** (gzip).

## Estrutura de pastas

```
public/
  index.html                  HTML base, meta tags e fontes
src/
  index.js                    entrada; importa tokens.css + global.css
  App.jsx                     shell: rota, busca, categorias, título do documento
  pages/
    HomePage.jsx              hero + chips + busca + grade
    AboutPage.jsx             página "Sobre"
  components/
    Header/                   cabeçalho e navegação
    Search/                   campo de busca (debounce no App)
    Category/                 chips de categoria
    Posts/                    HeroPost, PostCard, PostGrid, SkeletonCard
    Article/                  ArticlePage, ArticleBody, ReadingProgress
    Shared/                   Footer, NotFound, EmptyState, FallbackImage
  hooks/
    useHashRoute.js           parseRoute + useHashRoute (hash routing)
    usePosts.js               estado de busca/paginação/erro sobre a API
  services/
    postsApi.js               API simulada (latência 180–400 ms)
  data/
    posts.js                  9 artigos completos
    categories.js             categorias + contagens derivadas
    CONTRATO.md               contrato de dados
  styles/
    tokens.css                fonte da verdade do design system
    global.css                reset, base, utilitários, fundo cósmico
  utils/
    formatDate.js             data ISO -> "14 de outubro de 2026"
docs/
  design-spec.md              especificação de design (Day)
design-layout-blog-astronomia.md   briefing de layout original
contexto.md                   estado, decisões e histórico do projeto
```

## Como o conteúdo é editado

Todo o conteúdo vive em `src/data/posts.js`. Para publicar um artigo, acrescente um
objeto ao array `posts`:

```js
{
  id: '10',
  slug: 'titulo-em-kebab-case',        // vira a URL: #/post/titulo-em-kebab-case
  title: 'Título do artigo',
  excerpt: 'Resumo de 1–2 frases.',
  content: [
    { type: 'paragraph', text: '...' },
    { type: 'heading', text: 'Subtítulo' },
    { type: 'quote', text: '...', cite: 'Fonte' },
    { type: 'list', items: ['...', '...'] },
  ],
  category: 'galaxias',                 // precisa existir em src/data/categories.js
  categoryLabel: 'Galáxias',
  author: 'Nome',
  authorRole: 'Cargo',
  date: '2026-10-14',                   // ISO, ordena a home
  readingTime: 4,                       // minutos (200 palavras/min)
  imageCover: 'https://...jpg',
  imageAlt: 'Descrição para leitores de tela',
  imageCredit: 'NASA/JPL-Caltech',      // exibido junto da imagem
  tags: ['...'],
  featured: true,                       // no máximo um artigo em destaque
}
```

Regras práticas:

- `slug` é único e é a URL — não mude depois de publicar.
- `featured: true` marca a matéria do hero; deixe apenas um.
- Categorias novas entram em `CATEGORY_LABELS` (`src/data/categories.js`); a contagem
  é calculada automaticamente a partir dos posts.
- O contrato completo (shape, limites de texto, comportamento da API, busca e
  paginação) está em `src/data/CONTRATO.md`.

### Trocar a API simulada por uma real

`src/services/postsApi.js` expõe `getPosts`, `getFeaturedPost`, `getPostBySlug`,
`getCategories` e `getRelatedPosts` como funções assíncronas com a mesma assinatura de
uma API HTTP. Substitua o corpo por `fetch` mantendo a forma de retorno — nenhum
componente precisa mudar, desde que o shape continue igual ao do `CONTRATO.md`.

## Imagens e créditos

Todas as imagens de capa são hotlinks do arquivo público de imagens da NASA
(`images-assets.nasa.gov`, IDs `PIA*`), escolhidas e verificadas uma a uma (HTTP 200).
Cada artigo guarda `imageAlt` em português e `imageCredit` (ex.: `NASA/JPL-Caltech`),
exibido na interface.

Imagens da NASA são de domínio público; ainda assim, o crédito é mantido por cortesia
e transparência. **Não há imagens hospedadas no repositório** — nada em
`public/images/`. Se a rede falhar, o componente `FallbackImage` mostra um bloco
cósmico no lugar, sem quebrar o layout.

## Acessibilidade

- Contraste mínimo AA (4,5:1) em texto e 3:1 em elementos de interface.
- Skip link "Pular para o conteúdo" como primeiro elemento focável.
- Foco visível em todos os interativos; nada de `outline: none` sem substituto.
- Chips de categoria com `aria-pressed`; estados de carregamento/erro anunciados.
- Imagens decorativas com `aria-hidden`; imagens de conteúdo com `alt` descritivo.
- Animações desligadas sob `prefers-reduced-motion: reduce`.

## Design

- `design-layout-blog-astronomia.md` — briefing original de layout e referências
  (NASA APOD, Quanta Magazine, The Planetary Society, Sky & Telescope, Symmetry).
- `docs/design-spec.md` — especificação detalhada: escala tipográfica, paleta em
  camadas, anatomia de componentes, grid responsivo, estados e acessibilidade.
- `src/styles/tokens.css` — implementação dos tokens (cores, espaçamento, tipografia,
  sombras, transições). É a fonte da verdade: componentes consomem `var(--...)`, não
  valores soltos.

Decisão central do visual: **cards claros (`#F8F9FA`) sobre página escura**, com texto
secundário em `#8C97B3` (6,48:1 sobre o fundo escuro). O cinza `#4A5568` da referência
original foi descartado por dar apenas 2,51:1 — oito ajustes de contraste estão
registrados em `docs/design-spec.md`.

Breakpoints: `640px`, `641px`, `1025px`, `1280px`. Grade de cards: 1 coluna no mobile,
2 em tablet, 3 em desktop e 4 em telas largas.

## Documentação do projeto

- `contexto.md` — estado atual, decisões de arquitetura, correções feitas e pendências.
- `docs/design-spec.md` — especificação de design.
- `src/data/CONTRATO.md` — contrato de dados da camada de conteúdo.
