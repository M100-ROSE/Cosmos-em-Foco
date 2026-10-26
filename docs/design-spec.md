# Especificação de Design — Cosmos em Foco

**Versão:** 1.0 · **Fontes da verdade:** `design-layout-blog-astronomia.md` (referência do usuário) + `src/styles/tokens.css` (implementação dos tokens)
**Stack:** React 18 / Create React App · **CSS puro** · sem Tailwind, sem framework de UI, sem dependências novas.
**Unidade:** 1rem = 16px. Todos os valores abaixo são finais.

Este documento descreve o que a Anna deve implementar. Onde a referência original era ambígua ou inacessível, a correção está marcada com **[CORREÇÃO]** e justificada com contraste medido.

---

## 0. Regras de integração

1. `src/index.js` deve importar os tokens **antes** do global:

   ```js
   import './styles/tokens.css';
   import './styles/global.css';
   ```

   Alternativa válida: primeira linha de `global.css` com `@import './tokens.css';`. Não use as duas formas ao mesmo tempo.
2. `tokens.css` contém **somente** `:root` com custom properties. Nenhum seletor de elemento, nenhuma classe, nenhum reset.
3. As classes utilitárias do JSX atual (Tailwind) não existem e não devem ser substituídas por um Tailwind. Cada componente recebe classes semânticas (mapa no §11).
4. Nenhuma cor deve ser escrita em componente: sempre `var(--token)`.
5. O `index.html` deve ter `<html lang="pt-BR">` e as fontes carregadas por `<link>` (§1).

---

## 1. Tipografia

### 1.1 Carregamento das fontes — usar `<link>` no `public/index.html`

**Não use `@import` no CSS** (bloqueia o parser e atrasa o first paint). Cole no `<head>`, antes do bundle:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet">
```

Fallbacks (já nos tokens):
- Títulos: `var(--font-serif)` → `'Playfair Display', Georgia, 'Times New Roman', serif`
- Corpo: `var(--font-sans)` → `'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

Playfair Display: pesos 400, 600, 700 + itálico 400 (blockquote). Inter: 400, 500, 600, 700.

### 1.2 Escala tipográfica

Títulos em Playfair Display; corpo, metadados e UI em Inter. Line-heights sem unidade; letter-spacing em `em`.

| Token | Uso | Fonte / peso | Tamanho (rem / px) | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `--font-size-display` | Título editorial de abertura (artigos especiais) | Playfair 700 | `clamp(2.5rem, 1.65rem + 3.4vw, 4rem)` → 40px @360 · 52.5px @768 · 64px @1440 | `1.05` | `-0.02em` |
| `--font-size-h1` | Título de página / artigo | Playfair 700 | `clamp(2.25rem, 1.9rem + 1.5vw, 3rem)` → 36 · 41.9 · 48px | `1.1` | `-0.02em` |
| `--font-size-h2` | Título de seção | Playfair 700 | `clamp(1.75rem, 1.6rem + 0.75vw, 2.25rem)` → 28 · 31.4 · 36px | `1.2` | `-0.01em` |
| `--font-size-h3` | Título de card / subseção | Playfair 700 | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` → 22 · 25.3 · 28px | `1.25` | `-0.01em` |
| `--font-size-h4` | Subtítulo | Playfair 600 | `clamp(1.25rem, 1.2rem + 0.25vw, 1.375rem)` → 20 · 21.1 · 22px | `1.3` | `-0.01em` |
| `--font-size-lead` | Linha fina / standfirst | Inter 400 | `clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)` → 18 · 19.5 · 20px | `1.6` | `0` |
| `--font-size-body` | Corpo padrão, UI | Inter 400 | `1rem` / 16px | `1.65` | `0` |
| `--font-size-article` | Corpo do artigo (≥641px) | Inter 400 | `1.125rem` / 18px (16px no mobile) | `1.75` | `0` |
| `--font-size-body-sm` | Metadados, nav, botões | Inter 500/600 | `0.875rem` / 14px | `1.55` | `0` |
| `--font-size-caption` | Data, autor, figcaption | Inter 400/500 | `0.8125rem` / 13px | `1.4` | `0.01em` |
| `--font-size-overline` | Eyebrow, categoria, label | Inter 600 uppercase | `0.75rem` / 12px | `1.4` | `0.08em` |

Regras:
- Títulos (`h1`–`h4`) sempre `font-family: var(--font-serif)`, `color: var(--color-text-primary)`, `text-wrap: balance`.
- Parágrafos longos: `text-wrap: pretty`.
- Corpo do artigo **nunca** abaixo de 16px; largura máxima `68ch`.
- Não use `text-transform: uppercase` em títulos; só em `overline`.
- Não use pesos 300 ou 800 (não carregados).
- `font-size` de inputs ≥16px no mobile para evitar zoom automático no iOS (`--font-size-body`).

---

## 2. Paleta, superfícies e contraste

### 2.1 Cores base (fidelidade à referência, nomes preservados)

| Token | Hex | Função |
|---|---|---|
| `--night-deep` | `#0A0E2B` | Fundo global / camada 0 |
| `--night-medium` | `#1A1F45` | Superfície elevada / header / seções |
| `--night-light` | `#2D3748` | Texto escuro em contexto claro / divisores |
| `--nebula-purple` | `#A97FFF` | Acento da marca (fundos, ícones, traços) |
| `--star-orange` | `#FF6B6B` | CTA / destaque quente |
| `--emerald-green` | `#6BCB77` | Sucesso / estado positivo |
| `--celeste-soft` | `#6C8EBF` | Links de navegação sobre escuro |
| `--white-primary` | `#F8F9FA` | Texto principal no escuro / superfície de card |
| `--gray-muted` | `#4A5568` | **Somente sobre superfície clara** (texto secundário) |
| `--gray-light` | `#EDF2F7` | Superfície clara alternativa |
| `--border-focus` | `#C4A7FF` | Anel de foco no escuro |

### 2.2 Superfícies em camadas

| Token | Hex / valor | Uso |
|---|---|---|
| `--color-bg` | `#0A0E2B` | Fundo da página (camada 0) |
| `--color-surface-1` | `#121736` | Header sólido, painel de busca, footer, chips |
| `--color-surface-2` | `#1A1F45` | Seção elevada, hover de superfície escura, skeleton base |
| `--color-surface-card` | `#F8F9FA` | Superfície do PostCard (card claro) |
| `--color-surface-card-hover` | `#FFFFFF` | Card em hover |
| `--color-surface-card-alt` | `#EDF2F7` | Bloco interno do card claro |
| `--color-border-subtle` | `#2C3358` | Divisor decorativo (1px) |
| `--color-border` | `#3A4370` | Borda padrão de card/input escuro |
| `--color-border-strong` | `#6B7590` | Limite de controle (input) — 3.81:1 sobre `surface-1` |
| `--color-border-light` | `#D8DEE9` | Borda decorativa sobre card claro |
| `--color-border-light-strong` | `#6B7590` | Limite de controle sobre card claro — 4.36:1 |

**[CORREÇÃO] Cards claros são intencionais.** A referência define `#F8F9FA` como "texto principal, cards backgrounds". O layout correto é: página escura + hero escuro + cards de post claros com texto `#0A0E2B`/`#4A5568`. O erro do CSS antigo era usar `#4A5568` sobre o fundo escuro.

### 2.3 Texto e estados

| Token | Valor | Sobre | Ratio |
|---|---|---|---|
| `--color-text-primary` | `#F8F9FA` | `#0A0E2B` | **17.94:1** |
| `--color-text-secondary` | `#8C97B3` | `#0A0E2B` / `#121736` / `#1A1F45` | **6.48 / 5.99 / 5.42:1** |
| `--color-text-tertiary` | `#A8B2C8` | `#0A0E2B` / `#1A1F45` | **8.88 / 7.44:1** |
| `--color-text-inverse` | `#0A0E2B` | `#F8F9FA` | **17.94:1** |
| `--color-text-inverse-secondary` | `#4A5568` | `#F8F9FA` / `#EDF2F7` | **7.14 / 6.68:1** |
| `--color-text-on-accent` | `#0A0E2B` | `#A97FFF` | **6.45:1** |
| `--color-text-on-accent` | `#0A0E2B` | `#FF6B6B` | **6.81:1** |
| `--color-text-placeholder` | `#8C97B3` | `#121736` | **5.99:1** |
| `--color-text-disabled` | `#6B7590` | `#0A0E2B` | 4.12:1 (isento — disabled) |
| `--color-accent` | `#A97FFF` | `#0A0E2B` / `#1A1F45` | **6.45 / 5.41:1** |
| `--color-accent-hover` / `--color-accent-strong` | `#C4A7FF` | `#0A0E2B` / `#1A1F45` | **9.29 / 7.78:1** |
| `--color-accent-on-light` | `#6B3FBF` | `#F8F9FA` | **6.45:1** |
| `--color-cta` | `#FF6B6B` | `#0A0E2B` | **6.81:1** |
| `--color-cta-hover` | `#FF8585` | `#0A0E2B` | **8.05:1** |
| `--color-danger` | `#FF8A8A` | `#0A0E2B` | **8.33:1** |
| `--color-success` | `#6BCB77` | `#0A0E2B` | **9.39:1** |
| `--color-focus-ring` | `#C4A7FF` | `#0A0E2B` / `#121736` | **9.29 / 8.59:1** |
| `--color-focus-ring-light` | `#6B3FBF` | `#F8F9FA` | **6.45:1** |

### 2.4 Correções de contraste (obrigatórias)

| Item da referência | Ratio medido | Correção aplicada |
|---|---|---|
| `#4A5568` como texto secundário sobre `#0A0E2B` | **2.51:1** ✗ | Sobre escuro usar `#8C97B3` (6.48:1). `#4A5568` fica restrito a cards claros (7.14:1). |
| `#4A5568` sobre `#1A1F45` | **2.10:1** ✗ | idem; proibido sobre superfícies escuras. |
| `#A97FFF` como texto/link sobre card `#F8F9FA` | **2.78:1** ✗ | Usar `#6B3FBF` (6.45:1) sobre claro. |
| Texto branco em CTA `#FF6B6B` | **2.78:1** ✗ | Texto do CTA é `#0A0E2B` (6.81:1). |
| `#6C8EBF` como texto sobre `#2D3748` | **3.57:1** ✗ | `--celeste-soft` só sobre bg/`surface-1`/`surface-2` (≥4.72:1). Sobre `#2D3748`, usar `#C4A7FF`. |
| `#A97FFF` sobre `#2D3748` | **4.09:1** ✗ | `#C4A7FF` (5.89:1) quando precisar de roxo sobre essa superfície. |
| Anel de foco `#A97FFF` sobre card claro | **2.78:1** ✗ (mín. 3:1 p/ UI) | `#6B3FBF` sobre claro; `#C4A7FF` sobre escuro. |
| Hover de hero com `scale(1.05)` | — | Reduzido para `1.02` (evita corte e desconforto vestibular). |

---

## 3. Layout e grid responsivo

### 3.1 Container

```css
.container {
  width: 100%;
  max-width: var(--container-max); /* 1280px */
  margin-inline: auto;
  padding-inline: var(--gutter);   /* clamp(1rem, 4vw, 2.5rem) = 16 → 40px */
}
```

- `--container-max: 80rem` (1280px). Em telas >1441px, o container permanece 1280px e o excedente vira margem.
- `--container-narrow: 45rem` (720px) para EmptyState e 404.
- `--article-measure: 68ch` para parágrafos do artigo.
- `--space-section: clamp(2.5rem, 6vw, 5rem)` → 40px @360, 46px @768, 80px @1440.

### 3.2 Grade de posts (`PostCard`)

| Viewport | Colunas | Gap | Padding lateral | Largura útil do card |
|---|---|---|---|---|
| ≤ 640px | **1** | `16px` (`--grid-gap-sm`) | 16px | 100% |
| 641 – 1024px | **2** | `24px` (`--grid-gap-md`) | 25.6 → 40px | ~ (largura − gaps)/2 |
| 1025 – 1279px | **3** | `24px` | 40px | ~299px em 1025px |
| 1280 – 1440px | **4** | `24px` | 40px | (1280 − 72) / 4 = **302px** |
| ≥ 1441px | **4** | `24px` | margem automática (container 1280) | 302px |

```css
.post-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: var(--grid-gap-sm);
}
@media (min-width: 641px) {
  .post-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--grid-gap-md); }
}
@media (min-width: 1025px) {
  .post-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
@media (min-width: 1280px) {
  .post-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

**Nota:** a visão geral da referência diz "2 colunas mobile", mas a seção "Layout Responsivo" (mais específica) define 1 coluna ≤640. Prevalece **1 coluna**.
**[CORREÇÃO]** O JSX atual usa `xl:grid-cols-4` (1280px) — mantido como breakpoint real de 4 colunas, coerente com a referência "3-4 colunas dependendo da largura".

### 3.3 Alturas de mídia

| Elemento | ≤640 | 641–1024 | ≥1025 |
|---|---|---|---|
| Hero (mínimo) | 240px (`--hero-height-mobile`) | 320px (`--hero-height-tablet`) | 400px (`--hero-height-desktop`) |
| Imagem do card | `aspect-ratio: 16 / 9` | 16 / 9 | 16 / 9 |
| Header | 64px | 80px | 80px |
| Imagem de capa do artigo | 3 / 2 | 16 / 9 | 16 / 9 |

---

## 4. Componentes

### 4.1 Header

**Estrutura:** `header.site-header > div.container.site-header__inner > (a.logo + nav + div.actions)`.

| Propriedade | ≤640 | ≥641 |
|---|---|---|
| Altura | 64px | 80px |
| Posição | `sticky; top: 0` | idem |
| Fundo | `var(--gradient-header-scrolled)` + `backdrop-filter: blur(12px) saturate(120%)` | idem |
| Borda inferior | `1px solid var(--color-border-subtle)` | idem |
| Sombra | `var(--shadow-header)` | idem |
| Padding lateral | `var(--gutter)` | idem |
| z-index | `var(--z-header)` (200) | idem |

- **Logo:** link para `/`, Playfair 700, `1.25rem` (20px) mobile / `1.5rem` (24px) desktop, `line-height: 1`, `letter-spacing: -0.01em`, cor `--color-text-primary`. Hover: `#FFFFFF`, sem transform. Ícone opcional de estrela 20px em `--color-accent` com `gap: 8px`.
- **Nav (desktop):** `gap: 32px`, links Inter 500 `0.875rem`, cor `--celeste-soft`; hover `--color-accent-hover`; sublinhado 2px `--color-accent` que cresce de `scaleX(0)` a `1` em 180ms. Item ativo: cor `--color-accent-hover` + sublinhado visível. `min-height: 44px`, `display: inline-flex; align-items: center`.
- **Ações:** botão de busca 44×44 (`--radius-md`), ícone lupa 20px `--color-text-secondary`. Hover: fundo `--color-selectable-hover`, ícone `--color-text-primary`. `aria-label="Buscar posts"`, `aria-expanded`.
- **Busca desktop:** `SearchBar` inline com largura 240–320px, alinhada à direita, antes da nav (ou entre logo e nav). Esconde a nav? Não: nav permanece; em 641–900px pode colapsar para o ícone.

**Estado mobile da busca:**
1. Ícone visível só ≤640 (`display: none` acima disso; a barra inline assume).
2. Ao clicar: painel ancorado abaixo do header, `position: absolute; top: 100%; left: 0; right: 0;`, fundo `rgba(18, 23, 54, 0.98)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid var(--color-border)`, `box-shadow: var(--shadow-lg)`, padding `12px 16px 16px`, `z-index: var(--z-search-panel)`.
3. Entrada: `opacity 0 → 1` + `translateY(-4px → 0)` em 180ms `--ease-standard`. `prefers-reduced-motion`: só opacity.
4. Input com `autofocus`, altura 44px, label visualmente oculto; `Escape` fecha e devolve o foco ao botão que abriu; clique fora fecha; `aria-expanded` e `aria-controls` no gatilho.
5. Botão fechar 44×44, `aria-label="Fechar busca"`.
6. Ao abrir, o header não muda de altura; o painel sobrepõe o conteúdo (não empurra o layout).
7. Durante a digitação, o painel permanece aberto; só fecha em submit, `Escape` ou clique fora. (Corrige o `onBlur` atual, que fechava ao clicar no botão.)

### 4.2 Hero (post em destaque)

**Estrutura:** `article.hero > a.hero__link (stretched) > div.hero__media > img + div.hero__overlay + div.hero__content`.

| Propriedade | ≤640 | 641–1024 | ≥1025 |
|---|---|---|---|
| Altura mínima | 240px | 320px | 400px |
| Raio | 12px | 16px | 16px |
| Padding do conteúdo | 20px | 32px | 40px |
| Título | 1.75rem / 1.2 | 2.25rem / 1.15 | 3rem / 1.1 |
| Largura do texto | 100% | 70% | 60% (máx. 640px) |

- `position: relative; overflow: hidden; isolation: isolate;` fundo `--color-surface-2`.
- Imagem: `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;` transição `transform 320ms`; hover `scale(1.02)`. `alt` = título (ou descritivo da imagem; ver §7).
- Overlay: `var(--gradient-hero-overlay)` (mobile `--gradient-hero-overlay-mobile`). O gradiente garante ≥0.72 de opacidade na faixa de texto; não coloque texto acima de 68% da altura.
- Eyebrow "DESTAQUE": `overline` 12/600 uppercase, `letter-spacing: .08em`, fundo `--color-accent`, texto `--color-text-on-accent`, padding `4px 10px`, raio full, `margin-bottom: 12px`.
- Título: Playfair 700, `color: var(--color-white-pure)`, `text-wrap: balance`, máximo 3 linhas no mobile.
- Meta: data · autor, Inter 500 14px, cor `var(--color-text-on-media)` (≥10:1 sobre o overlay). Separador "·" com `opacity: .6` (decorativo).
- Hover (apenas `hover:hover`): card `translateY(-4px)`, `box-shadow: var(--shadow-xl)`, imagem `scale(1.02)`.
- Active: `translateY(-1px)`.
- Foco: anel `2px solid var(--color-focus-ring)` com `outline-offset: 4px` no link esticado.
- Não use `scale(1.05)` no card inteiro (corta bordas e cria overflow).

### 4.3 PostCard

**Estrutura:** `article.post-card > a.post-card__link (stretched) > figure.post-card__media > img; div.post-card__body > span.post-card__eyebrow + h3.post-card__title + div.post-card__meta + p.post-card__excerpt + span.post-card__cta`.

| Propriedade | ≤640 | ≥641 |
|---|---|---|
| Fundo | `--color-surface-card` | idem |
| Raio | 12px | 12px |
| Borda | `1px solid var(--color-border-card)` sobre fundo escuro | idem |
| Padding do corpo | 16px | 20px |
| Gap entre blocos | 8px | 8px |
| Imagem | 16/9, `object-fit: cover` | idem |
| Título | Playfair 600, 1.125rem / 1.3 | 1.25rem / 1.3 |
| Excerpt | 0.875rem / 1.55, 2 linhas | 3 linhas |
| Meta | 0.8125rem / 1.4, `#4A5568` | idem |
| Sombra | `--shadow-card` | idem |

- **Categoria (eyebrow):** 12/600 uppercase, `letter-spacing: .08em`, `--color-accent-on-light` (#6B3FBF), margin-bottom 6px, `text-decoration: none`.
- **Título:** `color: var(--color-text-inverse)`, `display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;`. Hover do card: `color: var(--color-accent-on-light)`.
- **Meta:** ícone de calendário 14×14 + data. `display: flex; align-items: center; gap: 6px;`. Autor opcional com `·`.
- **Excerpt:** `color: var(--color-text-inverse-secondary)`; `line-clamp: 3` (2 no mobile).
- **CTA textual:** "Ler artigo" + seta 14px, Inter 600 0.875rem, `#6B3FBF`; `gap: 6px`; hover seta `translateX(2px)`.
- **Hover:** `translateY(-4px)`, `--shadow-card-hover`, borda `rgba(169, 127, 255, 0.45)`, imagem `scale(1.03)` em 320ms. Só em `@media (hover: hover) and (pointer: fine)`.
- **Active:** `translateY(-1px) scale(0.995)`.
- **Focus-visible:** anel `2px solid var(--color-focus-ring-light)` + `outline-offset: 3px` (o link esticado recebe o anel; o card em si não usa `outline`).
- **Disabled/empty:** `border: 1px dashed var(--color-border-strong)`, fundo `--color-surface-1`, texto `--color-text-disabled`, sem hover, `pointer-events: none`, `aria-disabled="true"`.
- **Acessibilidade:** o card inteiro é um único link (não `div` com `onClick`). Título e imagem com `alt`; se a imagem for decorativa, `alt=""` e o link recebe `aria-label` com o título.
- **Nunca** use `position: absolute` no corpo do card (o JSX atual faz isso e o texto escapa do card).

### 4.4 ArticlePage

**Estrutura:** `main.article-page > header.article-hero > div.container > breadcrumb + eyebrow + h1 + p.standfirst + div.byline + figure.article-hero__media`; depois `div.container > div.article-layout > article.prose` (opcional `aside.toc` ≥1280).

| Propriedade | ≤640 | 641–1024 | ≥1025 |
|---|---|---|---|
| Padding vertical | 32px | 48px | 64px |
| Título | 2rem / 1.15 | 2.5rem / 1.12 | 3rem / 1.1 |
| Coluna de texto | 100% | 100% (max 720px) | 720px |
| Corpo | 1rem / 1.75 | 1.125rem / 1.75 | 1.125rem / 1.75 |
| Imagem de capa | 3/2, raio 12px | 16/9, raio 16px | 16/9, raio 16px |
| Gap hero → texto | 24px | 32px | 48px |

- **Breadcrumb:** 13px, `--color-text-secondary`, links hover `--color-accent-hover`; separador "›"; `aria-label="Você está em"`.
- **Eyebrow:** chip de categoria (ver §4.5, variante estática).
- **Título:** Playfair 700, `--color-text-primary`, `max-width: 20ch`; `text-wrap: balance`.
- **Standfirst:** Inter 400 20px, `--color-text-tertiary` (#A8B2C8, 8.88:1), `max-width: 60ch`, `line-height: 1.6`.
- **Byline:** avatar 40×40 (raio full, borda `1px var(--color-border)`), autor 14/600 `--color-text-primary`, data 13 `--color-text-secondary`, separador "·"; `gap: 12px`; `padding-block: 20px`; bordas superior/inferior `1px solid var(--color-border-subtle)`.
- **Prose:** `max-width: 68ch`; `p { margin: 0 0 1.5rem; }`; `color: #EDF2F7`; `a { color: var(--color-accent-hover); text-decoration: underline; text-underline-offset: 2px; }` hover `#FFFFFF`.
- `h2` no artigo: 2rem/1.2, `margin: 3rem 0 1rem`; `h3`: 1.5rem/1.25, `margin: 2rem 0 .75rem`.
- `blockquote`: borda esquerda 3px `--color-accent`, padding-left 24px, Playfair itálico 1.375rem/1.5, cor `--color-text-tertiary`.
- `figure` + `figcaption`: 13px `--color-text-secondary`, `margin-top: 8px`.
- `ul`/`ol`: `padding-left: 1.5rem`, `li + li { margin-top: .5rem; }`.
- **Barra de progresso de leitura (opcional):** 3px, topo abaixo do header, fundo `--gradient-cta`, `transform-origin: left`, atualizada por `scroll` passivo; desativada em `prefers-reduced-motion`.
- **TOC (≥1280):** coluna 240px, sticky `top: calc(var(--header-height) + 24px)`, 13px, item ativo com borda esquerda 2px `--color-accent`.
- **Prev/Next:** 2 cards lado a lado ≥641 (1 coluna no mobile), fundo `--color-surface-1`, borda, raio 12, padding 20; label overline; título 1.125rem serif; hover borda accent e `translateY(-2px)`.
- **Imagens no corpo:** sempre `width: 100%; height: auto; border-radius: 8px;`, `loading="lazy"` exceto capa (`fetchpriority="high"`).

### 4.5 Chips de categoria

**Estrutura:** `nav.category-chips[aria-label="Filtrar por categoria"] > button.chip[aria-pressed]`.

| Propriedade | Valor |
|---|---|
| Altura mínima | **44px** (`--touch-target`) |
| Padding | 10px 16px |
| Gap entre chips | 8px mobile / 12px desktop |
| Raio | `--radius-full` |
| Fonte | Inter 500, 0.875rem |
| Borda | `1px solid var(--color-border)` |
| Fundo (default) | `var(--color-selectable-bg)` |
| Texto (default) | `var(--color-text-on-surface)` (11.49:1 sobre `surface-1`) |

Estados:
- **Hover:** fundo `var(--color-selectable-hover)`, borda `var(--color-accent)`, texto `var(--color-accent-hover)`.
- **Selecionado:** fundo `--color-accent`, borda `--color-accent`, texto `--color-text-on-accent`, peso 600. `aria-pressed="true"`.
- **Focus-visible:** `outline: 2px solid var(--color-focus-ring); outline-offset: 2px;`.
- **Active:** `transform: scale(0.98)`.
- **Disabled:** fundo `--color-disabled-bg`, texto `--color-text-disabled`, borda `--color-disabled-border`, `cursor: not-allowed`.
- **Contador (opcional):** pílula 20px de altura, `padding: 0 6px`, fundo `rgba(10,14,43,.18)` no selecionado / `rgba(248,249,250,.10)` no default, 12/600.
- **Mobile:** `display: flex; flex-wrap: nowrap; overflow-x: auto; scroll-snap-type: x proximity; -webkit-overflow-scrolling: touch;` padding-inline = gutter; esconder scrollbar (`scrollbar-width: none`), cada chip `scroll-snap-align: start`, `flex: 0 0 auto`. Não usar máscara/gradiente que reduza contraste.

### 4.6 SearchBar

**Estrutura:** `form.search-bar[role="search"] > label.sr-only + div.search-bar__field > svg + input + button.search-bar__clear? + button.search-bar__submit`.

| Propriedade | Valor |
|---|---|
| Largura | 100%, `max-width: 480px` (inline no header: 240–320px) |
| Altura do campo | 48px desktop / 44px mobile |
| Fundo | `--color-surface-1` |
| Borda | `1px solid var(--color-border-strong)` |
| Raio | `--radius-lg` (12px) |
| Ícone | 20px, `left: 14px`, `--color-text-secondary`, `pointer-events: none` |
| Input | `padding: 0 12px 0 44px`, Inter 1rem, `color: var(--color-text-primary)`, fundo transparente, sem borda |
| Placeholder | `--color-text-placeholder`, sem `opacity` |
| Botão submit | altura 44px, `padding: 0 16px`, fundo `--color-accent`, texto `--color-text-on-accent`, `--radius-md`, Inter 600 0.875rem |

Estados:
- **Focus-within:** borda `--color-accent`, `box-shadow: 0 0 0 3px var(--color-focus-glow)`.
- **Hover (campo):** borda `#8C97B3`.
- **Botão hover:** `--color-accent-hover`; **active:** `scale(0.98)`.
- **Botão clear:** 44×44, aparece com `query.length > 0`, ícone X 16px, cor `--color-text-secondary`, hover `--color-text-primary`.
- **Disabled:** fundo `--color-disabled-bg`, borda `--color-disabled-border`, texto `--color-text-disabled`.
- **Erro:** borda `--color-danger`, mensagem 13px `--color-danger` abaixo, `aria-live="polite"`, ícone de alerta 16px.
- **Loading:** botão com spinner 16px (`border: 2px solid rgba(10,14,43,.35); border-top-color: #0A0E2B; animation: spin .8s linear infinite`), `aria-busy="true"`, texto "Buscando…".
- **Teclado:** `Enter` envia; `Escape` limpa/fecha; foco visível em todos os controles.
- Sem resultados: renderizar `EmptyState` (§4.9), não um alerta.

### 4.7 Footer

**Estrutura:** `footer.site-footer > div.container > div.footer-grid (3 colunas) + div.footer-bottom`.

| Propriedade | ≤640 | ≥641 |
|---|---|---|
| Padding vertical | 32px | 48px |
| Grid | 1 coluna, gap 32 | 3 colunas `2fr 1fr 1fr`, gap 48 |
| Fundo | `--color-surface-1` | idem |
| Borda superior | `1px solid var(--color-border-subtle)` | idem |
| Texto | `--color-text-secondary` (#8C97B3) | idem |

- **Marca:** logo Playfair 700 1.25rem `--color-text-primary`; tagline 14px `--color-text-secondary`, `max-width: 40ch`, `margin-top: 8px`.
- **Títulos de coluna:** overline 12/600 uppercase `--color-text-tertiary`, `letter-spacing: .08em`, `margin-bottom: 12px`.
- **Links:** 14px, `var(--color-text-on-surface)`; `min-height: 44px; display: inline-flex; align-items: center;`; hover `--color-accent-hover` com sublinhado; focus ring.
- **Redes sociais:** 44×44, borda `1px solid var(--color-border)`, raio full, ícone 18px; hover borda `--color-accent`, fundo `--color-accent-soft`, ícone `--color-accent-hover`.
- **Barra inferior:** `margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--color-border-subtle);` 13px `--color-text-secondary`; flex entre copyright e "Feito com curiosidade pelo cosmos"; empilha no mobile com gap 8.
- Newsletter (se existir): input + botão em linha ≥641, empilhados no mobile; input 44px; botão `--color-accent` com texto escuro; mensagem de sucesso `--color-success` 14px; `aria-live`.

### 4.8 Skeleton de card

**Estrutura:** `div.skeleton-card[aria-hidden="true"] > div.skeleton-card__media + div.skeleton-card__body > 4 spans`.

- Dimensões idênticas ao `PostCard` (mesmo raio, mesma proporção 16/9, mesmo padding) para evitar layout shift.
- Fundo do card: `--color-surface-1`; blocos: `--color-surface-2`.
- Shimmer: `background: var(--gradient-skeleton); background-size: 200% 100%; animation: shimmer 1.4s linear infinite;` com `@keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }`.
- Blocos: título 100%×16px + 70%×16px; meta 40%×12px; excerpt 100%×12px ×3; raio 4px; gap 8px. Linhas com `margin-top: 8px`.
- Hero skeleton: mesma altura do hero (240/320/400) + 2 barras de texto no rodapé.
- **Acessibilidade:** o container dos skeletons leva `role="status" aria-live="polite"` com `<span class="sr-only">Carregando posts…</span>`; cada card é `aria-hidden="true"`.
- Quantidade: igual ao número de colunas do breakpoint (1/2/3/4), mínimo 4 no desktop.
- `prefers-reduced-motion`: sem animação; fundo estático `--color-surface-2`.
- Variante clara (se o skeleton aparecer dentro de card claro): base `#E4E9F2`, brilho `#F3F5F9`.

### 4.9 EmptyState

**Estrutura:** `div.empty-state[role="status"] > svg + h2/h3 + p + div.empty-state__actions`.

- Container: `max-width: 480px; margin-inline: auto; padding: 64px 24px; text-align: center;`.
- Ícone: 56×56, traço 1.5px `var(--celeste-soft)` (#6C8EBF), `opacity: .9`, `margin-bottom: 24px`; `aria-hidden="true"`.
- Título: Playfair 600, 1.375rem/1.3, `--color-text-primary`.
- Texto: 1rem/1.6, `--color-text-secondary`, `max-width: 44ch`, `margin: 8px auto 0`.
- Ação primária: altura 44px, padding 0 20px, fundo `--color-accent`, texto `--color-text-on-accent`, raio 8px, Inter 600 0.875rem; hover `--color-accent-hover`; focus ring.
- Ação secundária: link 14/600 `--color-accent-hover`, sublinhado; `margin-top: 16px`.
- Variantes de texto: "Nenhum post encontrado", "Tente outra palavra-chave ou remova os filtros.", "Limpar filtros".
- Não usar ilustração raster; o ícone é SVG inline.

### 4.10 NotFound (404)

**Estrutura:** `main.not-found > div.container > div.not-found__inner > span.not-found__code + h1 + p + div.not-found__actions + div.not-found__orbit`.

- Seção: `min-height: calc(100vh - var(--header-height)); display: grid; place-items: center; padding-block: var(--space-section);`.
- Inner: `max-width: 560px; text-align: center;`.
- Código "404": Playfair 700, 6rem/1 desktop / 4rem mobile, cor `rgba(169, 127, 255, 0.30)` (decorativo, `aria-hidden="true"`).
- Título: "Perdido no espaço" — Playfair 700, 2rem/1.15 mobile, 2.5rem desktop.
- Texto: 1rem/1.65 `--color-text-secondary`, `max-width: 44ch`, `margin: 12px auto 0`.
- Ações: primária "Voltar ao início" (mesmo botão do EmptyState) + secundária "Ver posts recentes" (ghost: borda `--color-border-strong`, texto `--color-text-primary`, fundo transparente; hover fundo `--color-selectable-hover`).
- Órbita decorativa: círculo 280px, `border: 1px solid rgba(169,127,255,.22)`, `border-radius: 50%`, `position: absolute`, `aria-hidden`; um ponto 6px `--color-accent`; rotação lenta **apenas** se `prefers-reduced-motion: no-preference` (24s linear infinite); caso contrário, estático.
- `h1` único na página; links com alvo 44px.

---

## 5. Fundo cósmico (CSS puro, barato)

**Princípio:** zero imagens, zero canvas, zero JS. Apenas gradientes repetidos em uma camada fixa. O fundo nunca fica sob texto sem superfície opaca.

### 5.1 Camadas (3 no total)

| Camada | Implementação | Efeito |
|---|---|---|
| 0 — base | `body { background-color: var(--color-bg); }` | Azul-noite sólido |
| 1 — nebulosas | `body::before { position: fixed; inset: 0; background-image: var(--cosmic-glow-1), var(--cosmic-glow-2), var(--cosmic-glow-3); pointer-events: none; z-index: var(--z-cosmic); }` | 3 brilhos radiais (roxo 0.13, celeste 0.11, laranja 0.06) |
| 2 — estrelas | `body::after` com 3 `radial-gradient` de pontos repetidos, `background-size: 320px, 480px, 640px`; alpha 0.55 / 0.42 / 0.30 | ~27 estrelas visíveis em 1440×900 |

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: var(--z-cosmic);
  pointer-events: none;
  background-image:
    radial-gradient(1px 1px at 24px 36px, var(--cosmic-star-color) 50%, transparent 51%),
    radial-gradient(1.5px 1.5px at 210px 130px, var(--cosmic-star-color-dim) 50%, transparent 51%),
    radial-gradient(2px 2px at 420px 310px, var(--cosmic-star-color-faint) 50%, transparent 51%);
  background-size:
    var(--cosmic-star-tile-1),
    var(--cosmic-star-tile-2),
    var(--cosmic-star-tile-3);
  background-repeat: repeat;
}
```

- Conteúdo: `#root > * { position: relative; z-index: var(--z-content); }` (ou `main`, `header`, `footer` com `position: relative; z-index: 1`). O header usa `z-index: 200`.
- Contagem: tile de 320px → ~13 estrelas; 480px → ~9; 640px → ~5. Total ~27. Para telas grandes, o padrão repete; não aumentar densidade.
- Tamanhos: 1px, 1.5px, 2px. Nunca maiores que 2px (viram "bolhas").
- Opacidade: máx. 0.55; estrelas nunca sobre o texto de cards (cards claros são opacos) nem sobre o artigo (prose com `background` transparente, mas o texto fica na coluna central; se necessário, `article.prose` recebe `background: rgba(10,14,43,.55)` em telas largas? **Não** — prefira manter as estrelas fora da coluna de leitura via `z-index`; a camada fica atrás do conteúdo e o texto tem contraste próprio sobre o fundo escuro).
- **Sem animação por padrão.** Não usar `twinkle` contínuo. Se aprovado no futuro: no máximo 2 elementos, 4s, e desligado em `prefers-reduced-motion`.
- Não usar `filter: blur()` grandes (caro); os gradientes já são suaves.
- `background-attachment: fixed` apenas nos gradientes de nebulosa; nas estrelas usar `position: fixed` (pseudo-elemento), que é mais barato.

---

## 6. Interação e movimento

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | 80ms | `:active` |
| `--duration-fast` | 120ms | cor, borda, ícone |
| `--duration-base` | 180ms | botões, links, painel de busca |
| `--duration-slow` | 240ms | elevação de card |
| `--duration-slower` | 320ms | zoom de imagem do hero |
| `--ease-standard` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | padrão |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | entradas |
| `--transition-card` | transform + box-shadow | cards |

Regras:
- Hover de elevação (`translateY(-4px)`) **somente** em `@media (hover: hover) and (pointer: fine)`.
- `:active`: `scale(0.98)` em botões/chips; cards `translateY(-1px) scale(0.995)`.
- `:focus-visible` (nunca `:focus` puro para remover outline):
  ```css
  :focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
    border-radius: inherit;
  }
  ```
  Sobre superfície clara, `--color-focus-ring-light` (#6B3FBF).
- Nunca `outline: none` sem substituto visível.
- `@media (prefers-reduced-motion: reduce)`:
  ```css
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .hero:hover, .post-card:hover, .hero__media img, .post-card__media img {
    transform: none !important;
  }
  .skeleton-card * { animation: none !important; background: var(--color-surface-2) !important; }
  ```
  Mantenha mudanças de cor e o anel de foco (não são movimento).
- Não animar `width`, `height`, `top`, `left`; use `transform` e `opacity`.

---

## 7. Acessibilidade

### 7.1 Contraste (WCAG 2.1 AA)

| Par | Ratio | Resultado |
|---|---|---|
| `#F8F9FA` / `#0A0E2B` | 17.94:1 | AA/AAA ✔ |
| `#8C97B3` / `#0A0E2B` | 6.48:1 | AA ✔ |
| `#8C97B3` / `#121736` | 5.99:1 | AA ✔ |
| `#8C97B3` / `#1A1F45` | 5.42:1 | AA ✔ |
| `#C9D2E3` / `#121736` (chips) | 11.49:1 | AAA ✔ |
| `#6C8EBF` / `#1A1F45` (nav) | 4.72:1 | AA ✔ |
| `#A97FFF` / `#1A1F45` | 5.41:1 | AA ✔ |
| `#C4A7FF` / `#1A1F45` | 7.78:1 | AAA ✔ |
| `#FF6B6B` / `#0A0E2B` | 6.81:1 | AA ✔ |
| `#0A0E2B` / `#A97FFF` | 6.45:1 | AA ✔ |
| `#0A0E2B` / `#FF6B6B` | 6.81:1 | AA ✔ |
| `#0A0E2B` / `#F8F9FA` | 17.94:1 | AAA ✔ |
| `#4A5568` / `#F8F9FA` | 7.14:1 | AAA ✔ |
| `#6B3FBF` / `#F8F9FA` | 6.45:1 | AA ✔ |
| `#4A5568` / `#0A0E2B` | 2.51:1 | ✘ proibido |
| `#A97FFF` / `#F8F9FA` | 2.78:1 | ✘ proibido para texto |
| `#FFFFFF` / `#FF6B6B` | 2.78:1 | ✘ proibido |

Contornos de componente: `--color-border-strong` (#6B7590) sobre `#121736` = **3.81:1**; sobre card claro = **4.36:1**. Bordas decorativas (`#2C3358`, `#D8DEE9`) não precisam de 3:1, mas nunca são o único indicador de estado.

### 7.2 Regras obrigatórias

- **Foco visível** em 100% dos interativos (links, botões, inputs, chips). Anel 2px + offset 2px; em elementos sobre card claro, usar #6B3FBF.
- **Alvos de toque ≥44×44px** (`--touch-target`): botões de ícone, chips, links do footer, botões de busca. Em links de texto inline, o alvo é o texto (exceção WCAG 2.5.8).
- **Texto mínimo:** 16px para corpo; 13px apenas para metadados não essenciais. Suportar zoom 200% sem perda de conteúdo (sem alturas fixas em textos).
- **Alt text:**
  - Imagem de capa informativa: descrever o objeto astronômico, não repetir o título. Ex.: `alt="Nebulosa de Órion em tons de roxo e laranja"`.
  - Imagem decorativa: `alt=""` + `role="presentation"` (não usar `alt` igual ao título).
  - Hero link: se a imagem for decorativa, `aria-label` do link = título do post.
  - Avatares: `alt="Foto de <nome>"`.
- **Hierarquia de headings:** um `h1` por página; `h2` para seções; `h3` para cards. Não pular níveis.
- **Formulário:** `<label class="sr-only" for="busca">Buscar posts</label>`; `type="search"`, `autocomplete="off"`, `enterkeyhint="search"`.
- **Ícones:** `aria-hidden="true"` + `focusable="false"`; botões só com ícone recebem `aria-label`.
- **Skip link:** primeiro elemento focável, `position: absolute; top: -100px;` e ao focar `top: 8px; left: 8px; z-index: var(--z-skip-link);` fundo `--color-accent`, texto escuro, padding 12px 16px.
- **`lang="pt-BR"`** no `<html>`; `title` único por página.
- **Movimento:** respeitar `prefers-reduced-motion` (§6); nenhum autoplay.
- **Estados não só por cor:** chip selecionado tem `aria-pressed` + peso 600; erro tem ícone + texto; foco tem anel.

```css
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
```

---

## 8. Grid de implementação — resumo por breakpoint

| Token de layout | ≤640 | 641–1024 | 1025–1279 | 1280–1440 | ≥1441 |
|---|---|---|---|---|---|
| Container | 100% | 100% | 1280 max | 1280 max | 1280 max |
| Padding lateral | 16px | 25.6–40px | 40px | 40px | margem auto |
| Colunas do grid | 1 | 2 | 3 | 4 | 4 |
| Gap | 16px | 24px | 24px | 24px | 24px |
| Header | 64px | 80px | 80px | 80px | 80px |
| Hero | 240px | 320px | 400px | 400px | 400px |
| Seção (vertical) | 40px | ~46–60px | 64px | 80px | 80px |
| Título do hero | 1.75rem | 2.25rem | 2.5rem | 3rem | 3rem |
| Nav | oculta (busca ícone) | visível | visível | visível | visível |

Breakpoints em `@media` usam valores literais: `640px`, `641px`, `1024px`, `1025px`, `1279px`, `1280px`, `1440px`, `1441px`. Custom properties não funcionam em media queries.

---

## 9. O que NÃO fazer

- **Não instalar Tailwind**, Bootstrap, MUI, styled-components, Emotion, Framer Motion ou qualquer dependência.
- **Não usar classes utilitárias** no JSX (`grid-cols-4`, `text-[var(--x)]`, `sm:`, `hover:translate-y-4`). Substituir pelas classes semânticas do §11.
- **Não usar imagens de fundo** (JPG/PNG/WebP) para estrelas ou nebulosas; apenas gradientes CSS.
- **Não usar parallax** com `scroll` listener, `requestAnimationFrame` contínuo ou `background-attachment: fixed` em múltiplas camadas grandes.
- **Não usar `backdrop-filter`** em áreas grandes (só header e painel de busca, blur ≤16px).
- **Não usar `opacity` em texto** para criar hierarquia (usar tokens de cor).
- **Não usar `#4A5568` sobre fundo escuro**, nem `#A97FFF` como texto sobre card claro, nem branco sobre `#FF6B6B`.
- **Não usar `scale` >1.02** em hero/card; não usar `translateY(16px)` no hover (o JSX atual tem `hover:translate-y-4`, que empurra o card para baixo — errado).
- **Não posicionar o corpo do card em `absolute`**; o card cresce com o conteúdo.
- **Não usar `outline: none`** sem alternativa.
- **Não usar `z-index: 9999`** para estrelas; a camada cósmica fica em `z-index: 0`/`-1` atrás do conteúdo.
- **Não criar altura fixa** para cards, header em telas menores, ou textos (exceto mídia com `aspect-ratio`).
- **Não usar `!important`** exceto no bloco de `prefers-reduced-motion`.
- **Não usar fontes externas além de Playfair Display e Inter.**
- **Não duplicar tokens**: componentes consomem `var(--color-*)`, nunca hex.

---

## 10. Critérios de aceite visual

1. `tokens.css` é CSS válido (nenhum `export`, nenhum `//`) e passa no parser do CRA.
2. Nenhuma classe Tailwind permanece no JSX; `global.css` não contém `//`.
3. Em 360px: 1 coluna, gutter 16px, header 64px, busca abre como painel e fecha com `Escape`.
4. Em 768px: 2 colunas, gap 24px, hero 320px, nav visível.
5. Em 1280px: 4 colunas, cards de 302px, container 1280px centralizado.
6. Cards claros (`#F8F9FA`) com título `#0A0E2B` e meta `#4A5568`; nenhum texto `#4A5568` sobre o fundo escuro.
7. Hover de card: −4px + sombra + imagem 1.03; nada se move em `prefers-reduced-motion`.
8. Foco visível em todos os interativos; anel correto em fundo escuro e claro.
9. Chips com 44px de altura, seleção indicada por `aria-pressed` e cor.
10. Fundo cósmico com ~27 estrelas, sem imagens, sem animação, sem interferir na leitura.
11. Skeleton mantém as dimensões do card e não gera layout shift.
12. Contraste de todos os pares do §7.1 conforme indicado.
13. Nenhuma rolagem horizontal em 320px.

---

## 11. Mapa de classes semânticas (substituir o JSX utilitário)

| Componente | Classes |
|---|---|
| App / página | `.app`, `.container`, `.section`, `.section--surface` |
| Header | `.site-header`, `.site-header__inner`, `.site-header__brand`, `.site-header__nav`, `.site-header__actions`, `.nav-link`, `.nav-link--active` |
| Busca mobile | `.mobile-search`, `.mobile-search__input`, `.mobile-search__close`, `.search-toggle` |
| Hero | `.hero`, `.hero__link`, `.hero__media`, `.hero__img`, `.hero__overlay`, `.hero__content`, `.hero__eyebrow`, `.hero__title`, `.hero__meta` |
| Grid | `.post-grid`, `.section-heading` |
| Card | `.post-card`, `.post-card__link`, `.post-card__media`, `.post-card__img`, `.post-card__body`, `.post-card__eyebrow`, `.post-card__title`, `.post-card__meta`, `.post-card__excerpt`, `.post-card__cta` |
| Chips | `.category-chips`, `.chip`, `.chip--selected`, `.chip__count` |
| SearchBar | `.search-bar`, `.search-bar__field`, `.search-bar__input`, `.search-bar__clear`, `.search-bar__submit`, `.search-bar__error` |
| Artigo | `.article-page`, `.article-hero`, `.breadcrumb`, `.article-title`, `.standfirst`, `.byline`, `.prose`, `.article-layout`, `.toc`, `.article-nav` |
| Footer | `.site-footer`, `.footer-grid`, `.footer-col`, `.footer-links`, `.footer-social`, `.footer-bottom` |
| Skeleton | `.skeleton-grid`, `.skeleton-card`, `.skeleton-card__media`, `.skeleton-card__body` |
| EmptyState | `.empty-state`, `.empty-state__actions` |
| NotFound | `.not-found`, `.not-found__code`, `.not-found__actions`, `.not-found__orbit` |
| Utilidades | `.sr-only`, `.stack`, `.cluster` (opcionais; não substituem os componentes) |

---

## 12. Resumo das decisões

- Página escura (`#0A0E2B`) + cards claros (`#F8F9FA`): fiel à referência e resolve o contraste de `#4A5568` sem descaracterizar a paleta.
- Texto secundário no escuro trocado de `#4A5568` para `#8C97B3` (6.48:1) — correção registrada.
- Roxo sobre claro trocado para `#6B3FBF` (6.45:1); CTA com texto escuro (6.81:1).
- Escala tipográfica com 11 níveis, títulos fluidos via `clamp`, corpo fixo em 16px e artigo em 18px.
- Grid 1/2/3/4 colunas (16/24/24/24px), container 1280px, gutter fluido de 16 a 40px.
- Fundo cósmico em 3 camadas CSS estáticas (~27 estrelas), sem imagens e sem animação contínua.
- Movimento contido (120–320ms, −4px de elevação, zoom 1.02/1.03) e desligado em `prefers-reduced-motion`.
- Sem Tailwind, sem framework, sem dependências novas.
