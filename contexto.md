# Contexto do Projeto — Cosmos em Foco

Blog de astronomia em React 18 (Create React App), com CSS puro e design
"aconchego cósmico". Este arquivo registra preferências, estado atual e o
histórico de entregas, para que nada se perca entre sessões.

---

## Preferências

- Idioma de trabalho e documentação: **português do Brasil**.
- Stack fixa: **React 18 / CRA** + **CSS puro**. Sem Tailwind, sem framework de
  UI, sem dependências novas sem autorização explícita.
- `src/styles/tokens.css` é a fonte da verdade dos tokens de design; o
  documento `design-layout-blog-astronomia.md` é a referência de layout.
- Especificações de design ficam em `docs/design-spec.md`; contratos de dados em
  `src/data/CONTRATO.md`.
- Commits curtos no padrão `tipo: descrição` (`feat:`, `fix:`, `docs:`,
  `refactor:`, `chore:`, `style:`, `test:`), um assunto por commit.
- Não usar `--force`, `reset --hard`, `clean -fd` nem reescrever histórico.
- Não commitar segredos, `.env`, `node_modules` ou artefatos de build.

---

## Estado atual

**Situação:** o site compila e roda. `npm run build` → `Compiled successfully`, com
**71,03 kB de JS** e **7,66 kB de CSS** (gzip). Único aviso: `DEP0176` (`fs.F_OK`), que
vem do Node/`react-scripts`, não do app.

- **Branch:** `main` — remoto `origin` = `https://github.com/M100-ROSE/Cosmos-em-Foco.git`.
- **Stack:** React 18 + Create React App 5, CSS puro com custom properties, zero
  dependências de UI. Dependências de runtime: `react`, `react-dom`, `react-scripts`.
- **Rotas (hash routing):** `#/`, `#/post/:slug`, `#/categoria/:id`, `#/sobre`; qualquer
  outra coisa cai no 404.
- **Conteúdo:** 9 artigos longos em `src/data/posts.js` (600+ palavras cada), 5
  categorias + "todas" em `src/data/categories.js`.

### Decisões de arquitetura

1. **Hash routing próprio, sem `react-router`.** `src/hooks/useHashRoute.js` escuta
   `hashchange` e expõe `parseRoute`/`navigate`. Motivo: zero dependências novas e
   deploy em hospedagem estática (GitHub Pages inclusive) sem regra de rewrite de
   servidor. Efeito colateral aceito: URLs com `#`.
2. **CSS puro com tokens.** `src/styles/tokens.css` é a fonte da verdade (~169 custom
   properties: cor, tipografia, espaço, raio, sombra, transição); um `.css` por
   componente, mobile-first, breakpoints em 640/641/1025/1280 px. Sem Tailwind, sem
   CSS-in-JS, sem `!important` como muleta.
3. **Cards claros sobre fundo escuro.** Decisão de contraste do design system: página
   escura (`--night-*`), cards em `#F8F9FA`, texto secundário no card em tom escuro e,
   sobre o fundo escuro, `#8C97B3` (6,48:1). `#4A5568` foi proibido sobre fundo escuro
   (2,51:1).
4. **API mock substituível.** `src/services/postsApi.js` é assíncrono (latência
   180–400 ms) e devolve o mesmo shape de uma API HTTP. Trocar por `fetch` real
   significa reescrever só esse arquivo, mantendo `getPosts`, `getFeaturedPost`,
   `getPostBySlug`, `getCategories`, `getRelatedPosts`. Contrato em
   `src/data/CONTRATO.md`.
5. **Conteúdo como dados, não como JSX.** O corpo do artigo é um array de blocos
   (`paragraph`, `heading`, `quote`, `list`) renderizado por `ArticleBody.jsx`.
   Publicar matéria = editar `posts.js`, sem tocar em componente.
6. **Acessibilidade no nível do componente.** Hash routing com foco gerenciado, skip
   link, `aria-pressed` nos chips, `document.title` por rota, `prefers-reduced-motion`
   respeitado em todos os `.css`.

### O que estava quebrado e foi corrigido

O projeto **não compilava**. Correções aplicadas nesta entrega:

| Problema | Correção |
| --- | --- |
| `style={{ backgroundColor: var(--night-medium) }}` em `App.jsx` | CSS válido / classe |
| `style="..."` (string) em JSX no Header e na SearchBar | `style={{ ... }}` |
| `PropTypes` usados sem a dependência instalada | removidos |
| Classes Tailwind no JSX sem Tailwind instalado | CSS puro por componente |
| `tokens.css` com `export const` dentro de `.css` | CSS válido, 100% custom properties |
| `global.css` com comentários `//` | `/* */` |
| Imagens apontando para `/images/*.jpg` inexistentes | URLs NASA verificadas + `FallbackImage` |
| `PostCard` com corpo em `position:absolute` sem pai `relative` | layout corrigido |
| `"type": "module"` no `package.json` quebrava o CRA | removido |
| `react-icons` declarado e não usado | removido do `package.json` e do lock |
| Sem `.gitignore`, sem README, sem contexto | criados |

### Mapa dos arquivos principais

| Arquivo | Papel |
| --- | --- |
| `src/index.js` | entrada; importa `tokens.css` + `global.css` |
| `src/App.jsx` | shell: rota atual, busca com debounce (300 ms), categoria, `document.title` |
| `src/pages/HomePage.jsx` | hero + chips + busca + grade + "Carregar mais" |
| `src/pages/AboutPage.jsx` | página "Sobre o blog" |
| `src/hooks/useHashRoute.js` | `parseRoute`, `useHashRoute`, `navigate`, scroll ao topo |
| `src/hooks/usePosts.js` | lista, loading, erro, paginação, guarda contra resposta fora de ordem |
| `src/services/postsApi.js` | API mock assíncrona (180–400 ms) |
| `src/data/posts.js` | 9 artigos (shape no `CONTRATO.md`) |
| `src/data/categories.js` | `CATEGORY_LABELS` + contagens derivadas dos posts |
| `src/components/Posts/` | `HeroPost`, `PostCard`, `PostGrid`, `SkeletonCard` |
| `src/components/Article/` | `ArticlePage`, `ArticleBody`, `ReadingProgress` |
| `src/components/Shared/` | `Footer`, `NotFound`, `EmptyState`, `FallbackImage` |
| `src/styles/tokens.css` | design tokens |
| `src/styles/global.css` | reset, base, utilitários, fundo cósmico, reduced motion |
| `docs/design-spec.md` | especificação de design (Day) |
| `design-layout-blog-astronomia.md` | briefing de layout original |
| `src/data/CONTRATO.md` | contrato de dados |

### Documentação

`README.md` (visão geral, como rodar, como editar conteúdo), `docs/design-spec.md`
(especificação de design), `design-layout-blog-astronomia.md` (referência de layout),
`src/data/CONTRATO.md` (dados) e os briefings `briefing-site.txt` (118 perguntas) e
`briefing-simples.txt` (33 perguntas).

### Pendências

- [ ] **`node_modules` está versionado no repositório** (19.097 arquivos). O
      `.gitignore` agora está commitado, mas não tem efeito retroativo: o índice
      continua rastreando esses arquivos e o `git status` fica permanentemente sujo.
      Precisa de autorização para `git rm -r --cached node_modules` + commit
      (`chore:`). Não foi feito nesta rodada de propósito.
- [ ] `src/data/CONTRATO.md` afirma que `src/data/samplePosts.js` "continua existindo";
      o arquivo foi **removido de propósito**. Corrigir a nota (não foi tocado nesta
      rodada porque `src/**` estava fora do escopo).
- [ ] Nenhum teste automatizado (`npm test` existe, sem arquivos de teste).
- [ ] `public/` tem só `index.html`: falta `favicon.ico`, `robots.txt` e um ícone
      social (Open Graph) para compartilhamento.
- [ ] Artigos não têm `<meta property="og:...">` por rota (só `document.title`).
- [ ] Busca e filtros não são refletidos na URL — recarregar perde o estado.
- [ ] Imagens são hotlink de `images-assets.nasa.gov`: se o domínio mudar, o
      `FallbackImage` entra em ação, mas o ideal é migrar para imagens locais
      otimizadas.
- [ ] Preencher os briefings (`briefing-site.txt` / `briefing-simples.txt`) com as
      respostas do cliente (Day).

---

## Histórico

### 2026-10-26 — Questionário de briefing para o site

**Solicitação original:** registrar no Git o novo arquivo de briefing criado
pela Day, sem tocar em código, em `src/` ou em `public/`.

**O que foi feito:**

1. `git status` inspecionado: `briefing-site.txt` confirmado como novo; o
   arquivo estava acompanhado de outras alterações pré-existentes
   (`node_modules/`, `package.json`, `src/styles/tokens.css` e arquivos ainda
   não rastreados como `.gitignore`, `docs/`, `package-lock.json`,
   `src/data/`, `src/services/`, `src/utils/`), que **não** foram incluídas
   neste commit.
2. Conteúdo validado: 31.251 bytes, 30.795 caracteres, UTF-8 válido sem BOM,
   118 perguntas numeradas em 13 seções, texto puro em pt-BR.
3. `contexto.md` criado (não existia) registrando preferências, estado atual do
   projeto e esta entrega.

**Arquivos alterados:**

- `briefing-site.txt` (novo) — questionário de briefing para site, 118
  perguntas em 13 seções, texto puro UTF-8.
- `contexto.md` (novo) — este arquivo de contexto.

**Pendências:**

- [ ] Preencher o `briefing-site.txt` com as respostas do cliente (Day).
- [ ] Decidir o que fazer com os 19.097 arquivos de `node_modules` versionados:
      remover do índice e commitar o `.gitignore`.
- [ ] Commitar (ou descartar conscientemente) as alterações pendentes fora
      deste commit: `package.json`, `src/styles/tokens.css`, `package-lock.json`,
      `docs/`, `src/data/`, `src/services/`, `src/utils/`.
- [ ] Revisar os arquivos de `node_modules` que aparecem como modificados ou
      deletados no `git status` (possível instalação parcial ou limpeza local).

---

### 2026-10-26 - Versão simplificada do briefing de site (33 perguntas)

**Solicitação original:** registrar no Git a versão simplificada do briefing
criada pela Day, sem tocar em código, `src/`, `docs/`, `node_modules` ou no
`briefing-site.txt`.

**O que foi feito:**

1. `git status` e `git diff` inspecionados antes de qualquer ação: as alterações
   em `node_modules/`, `package.json` e `src/styles/tokens.css`, além dos itens
   ainda não rastreados (`.gitignore`, `docs/`, `package-lock.json`, `src/data/`,
   `src/services/`, `src/utils/`), são pré-existentes e **ficaram fora** deste
   commit.
2. `briefing-simples.txt` validado: 6.693 bytes, UTF-8 sem BOM, quebras LF,
   pt-BR, 33 perguntas numeradas distribuídas em 6 seções (Objetivo; Público e
   Conteúdo; Identidade Visual; Estrutura e Funcionalidades; Técnico e SEO;
   Prazo, Orçamento e Aprovação). O resumo do time confere com o arquivo real.
3. Registro desta entrega no histórico e menção aos dois briefings (completo com
   118 perguntas e simplificado com 33) no Estado atual.

**Arquivos alterados:**

- `briefing-simples.txt` (novo) - versão simplificada do briefing, 33 perguntas
  em 6 seções, texto puro UTF-8.
- `contexto.md` (modificado) - nova entrada de histórico e atualização da seção
  de documentação.

**Pendências:**

- [ ] Preencher as respostas do `briefing-simples.txt` (e do briefing completo,
      se necessário) com a Day.
- [ ] Remover os 19.097 arquivos de `node_modules` do índice e commitar o
      `.gitignore` que já existe no disco.
- [ ] Commitar (ou descartar conscientemente) as alterações pendentes fora
      deste commit: `package.json`, `package-lock.json`,
      `src/styles/tokens.css`, `docs/`, `src/data/`, `src/services/`,
      `src/utils/`.

---

### 2026-10-26 — Finalização do blog: build corrigido, UI, dados, design e docs

**Solicitação original:** fechar o ciclo da entrega do blog Cosmos em Foco —
organizar, documentar o contexto, revisar, commitar e dar push — partindo de um
projeto que não compilava.

**O que foi feito:**

1. Inspeção do estado real: `git status`, `git diff`, árvore de `src/` e `docs/`,
   checagem de encoding (UTF-8 sem BOM em todos os arquivos verificados), build
   rodado localmente (`Compiled successfully`, 71,03 kB JS / 7,66 kB CSS gzip).
2. Verificação de que não há lixo de debug em `src/`: nenhum `console.log`, `alert`,
   `debugger`, `TODO`/`FIXME`, nenhuma referência a `prop-types`, `react-icons`,
   `@tailwind` ou `"type": "module"`; todos os imports relativos resolvem (0
   quebrados); `samplePosts.js` e `Shared/SearchBar.jsx` foram removidos de propósito
   e não são mais importados em lugar nenhum.
3. `package-lock.json` conferido: raiz com `react`, `react-dom`, `react-scripts`
   apenas — `react-icons` sumiu do lock, coerente com a remoção no `package.json`.
   (`tailwindcss` que aparece no lock é dependência transitiva do `react-scripts`, não
   do app.)
4. **Entregas do time reunidas nesta rodada:** Monica validou 8 URLs de imagem
   NASA/ESO (todas 200) com crédito e alt em pt-BR; Day escreveu
   `docs/design-spec.md` (655 linhas) e reescreveu `tokens.css` como CSS válido;
   Asta entregou `posts.js` (9 artigos), `categories.js`, `postsApi.js`,
   `formatDate.js` e `CONTRATO.md`; Anna reescreveu a UI sem Tailwind (hash routing,
   home, artigo, sobre, 404, skeletons, estados vazios/erro) e consertou o build.
5. `README.md` criado: features, stack, como rodar, estrutura de pastas, como editar
   conteúdo, origem e créditos das imagens, acessibilidade e origem do design.
6. `contexto.md` reescrito nas seções "Estado atual", "Decisões de arquitetura",
   "O que estava quebrado", "Mapa dos arquivos" e "Pendências", com esta entrada no
   histórico. Entradas antigas preservadas.
7. Commit e push seletivos: apenas arquivos do projeto foram para o índice —
   `node_modules/` e `build/` ficaram fora (ver pendência estrutural).

**Arquivos alterados:**

- `README.md` (novo) — documentação de entrada do projeto.
- `contexto.md` (modificado) — estado atual, arquitetura, correções, mapa de arquivos,
  pendências e esta entrada.
- `.gitignore` (novo) — `node_modules` e `/build`.
- `package.json`, `package-lock.json` (modificados/novo) — `"type": "module"` e
  `react-icons` removidos; `browserslist` adicionado; lock gerado de novo.
- `public/index.html` (modificado) — meta description, theme-color, preconnect e fontes.
- `src/App.jsx`, `src/index.js` (modificados) — shell com hash routing, busca e título
  por rota; entrada importa tokens antes do global.
- `src/components/Header/Header.jsx` (modificado) + `Header.css` (novo).
- `src/components/Posts/HeroPost.jsx`, `PostCard.jsx` (modificados) +
  `HeroPost.css`, `PostCard.css`, `PostGrid.jsx`, `PostGrid.css`,
  `SkeletonCard.jsx` (novos).
- `src/components/Article/` (novo) — `ArticlePage.jsx`, `ArticlePage.css`,
  `ArticleBody.jsx`, `ReadingProgress.jsx`.
- `src/components/Category/` (novo) — `CategoryChips.jsx`, `CategoryChips.css`.
- `src/components/Search/` (novo) — `SearchBar.jsx`, `SearchBar.css`.
- `src/components/Shared/` — `SearchBar.jsx` removido; `Footer`, `NotFound`,
  `EmptyState`, `FallbackImage` (+ `.css`) adicionados.
- `src/hooks/` (novo) — `useHashRoute.js`, `usePosts.js`.
- `src/pages/` (novo) — `HomePage.jsx`, `HomePage.css`, `AboutPage.jsx`,
  `AboutPage.css`.
- `src/services/postsApi.js` (novo) — API mock assíncrona.
- `src/data/` — `posts.js`, `categories.js`, `CONTRATO.md` novos; `samplePosts.js`
  removido.
- `src/utils/formatDate.js` (novo).
- `src/styles/tokens.css`, `src/styles/global.css` (modificados) — CSS válido com
  tokens e base reescrita.
- `docs/design-spec.md` (novo) — especificação de design.

**Pendências:**

- [ ] Remover os 19.097 arquivos de `node_modules` do índice (`git rm -r --cached
      node_modules`) — exige autorização, não foi feito aqui.
- [ ] Corrigir a nota desatualizada sobre `samplePosts.js` em `src/data/CONTRATO.md`.
- [ ] Escrever testes (hoje `npm test` não tem nenhum arquivo de teste).
- [ ] Adicionar `favicon.ico`, `robots.txt` e metatags Open Graph por rota.
- [ ] Refletir busca/categoria na URL para permitir recarregar sem perder estado.
- [ ] Avaliar migrar as imagens da NASA para arquivos locais otimizados.

---

## Modelo para novas entradas

```markdown
### AAAA-MM-DD — Título curto da tarefa

**Solicitação original:** (o que foi pedido, em uma ou duas frases)

**O que foi feito:**

1. ...
2. ...

**Arquivos alterados:**

- `caminho/do/arquivo` (novo | modificado | removido) — o que mudou.

**Pendências:**

- [ ] ...
- [ ] ...
```

> Nunca apague entradas antigas do histórico; apenas acrescente novas.
