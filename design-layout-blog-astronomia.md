# Design de Layout para Blog de Astronomia em React

## Visão Geral do Layout

O layout segue o padrão de site de notícias com elementos específicos de astronomia, criando uma experiência "aconchegante do cosmos" em vez de fria/industrial.

### Estrutura de Páginas

1. **Header** - Logo/namespace, barra de busca, navegação sutil
2. **Hero/Destaque** - Post em destaque com imagem capa full-width
3. **Grid de Posts** - Cards em grade responsiva (2 colunas mobile, 3-4 colunas desktop)
4. **Seção "Posts Recentes"** - Lista abaixo ou lateral dependendo do viewport

### Fluxo Visual

```
[HEADER]
           |
           └─>[HERO: Post em Destaque]
                   |
                   └─>[GRID de POSTS RECENTES]
                              ├─ Card 1
                              ├─ Card 2
                              ├─ Card 3
                              └─ ... (mais cards)
```

## Paleta de Cores Hexadecimais

Baseada no tema "aconchego do cosmos" - tons profundos mas suaves:

1. **Azul-Noite Profundo** - `#0A0E2B` - Cor base para fundos, conveys profundidade
2. **Azul-Celeste Suave** - `#6C8EBF` - Acentos, headers, hover states
3. **Roxo-Nebuloso** - `#A97FFF` - Cores de destaque, links, highlights
4. **Laranja-Corpo-Estelar** - `#FF6B6B` - Botões CTA, elementos importantes
5. **Verde-Esmeralda Suave** - `#6BCB77` - Estados positivos, destaque secundário
6. **Branco-Céu Claridade** - `#F8F9FA` - Texto principal, cards backgrounds
7. **Cinza-Cósmico Muted** - `#4A5568` - Textos secundários, metadados

## Sugestões de Tipografia

### Fontes Principais:

- **Títulos:** "Playfair Display" (serifado) - transmite conhecimento/seriedade
  - Pesos: 400, 700
  - Tamanhos: h1=3rem, h2=2.25rem, h3=1.75rem

- **Texto Corporal:** "Inter" (sem serif) - legibilidade moderna
  - Pesos: 400, 500, 600
  - Altura de linha: 1.6 para corpo, 1.4 para metadados

### Aplicação:

- `h1, h2, h3, h4` → Playfair Display, cores: `#0A0E2B` ou `#6C8EBF`
- `p, span, metadados` → Inter, cores: `#4A5568`
- CTA links → Inter com cor de acento (Roxo-Nebuloso ou Laranja-Corpo-Estelar)

## Componentes Principais Identificados

### 1. `Header`
- Logo/namespace à esquerda
- Barra de busca centralizada ou à direita
- Links de navegação sutis (Home, Categorias, Sobre)
- Fundo: gradient sutil `linear-gradient(135deg, #0A0E2B 0%, #1A1F45 100%)`
- Altura fixa: 80px

### 2. `HeroPost` (Post em Destaque)
- Full-width com imagem capa
- Overlay gradient sutil para legibilidade do texto
- Conteúdo: título (Playfair Display), meta-info (data, autor)
- Efeito de "lift" sutil ao hover

### 3. `PostCard` (Card de Post)
- Grade responsiva com gap consistente (16px mobile, 24px desktop)
- Estrutura:
  - Imagem capa (aspect ratio 16:9 ou 4:3)
  - Área de conteúdo com padding inferior
  - Título (Playfair Display, tamanho variável)
  - Metadados: data + autor (Inter, pequeno)
  - Resumo/excerto (Inter, 2-3 linhas)
- Hover effect: elevar 4px, sombra suave, imagem slightly zoom (101%)
- Estado disabled/empty se necessário

### 4. `SearchBar`
- Input com ícone de lupa
- Background semi-transparente, bordas arredondadas
- Focus state com glow sutil da cor de acento

### 5. `FundoSutil`
- Estreminhas dispersas (opacity 0.3-0.5) em fundo azul-noite
- Linhas sutis orbitalmente distribuídas
- Rate of dispersion: ~20-30 estrelas visíveis

## Layout Responsivo

### Mobile (≤640px)
- Grid: 1 coluna, cards empilhados
- Header: busca como ícone expandível ao clicar
- Hero: full-width, imagem cobre height visible (~200px)
- Cards: width 100%, max-width nenhum (flui)

### Tablet (641-1024px)
- Grid: 2 colunas
- Hero: height ~300px
- Cards: largura calc(50% - 12px)

### Desktop (≥1025px)
- Grid: 3-4 colunas dependendo largura
- Hero: height ~400px, pode ter sidebar estreita
- Cards: largura calc(25% - 16px) para 4 cols, calc(33.33% - 16px) para 3 cols

### Breakpoints Consistentes
- `mobile`: 0px - 640px
- `tablet`: 641px - 1024px
- `desktop`: 1025px - 1440px
- `wide-desktop`: 1441px+

## Assets Visuais Sugeridos

1. **Fundo Header** - Gradiente espacial profundo (arquivo SVG ou CSS gradient)
2. **Ícones de busca** - Linha única, estilo minimalista
3. **Estrelas de fundo** - Sprite sheet ou CSS radial gradients dispersos
4. **Imagens de posts** - Fotos de telescópio/espacio with space for text overlay
5. **Ícones de data/autor** - Pequenos símbolos (calendário, usuário)
6. **Setas de navegação** - Anterior/próximo posts, discreto

## Estados de Interação

- **Hover em card**: transform: translateY(-4px) + box-shadow aumentado + scale(1.02) no conteúdo interno
- **Focus em input search**: outline 2px `var(--accent-purple)` + box-shadow glow
- **Active state**: ligeiramente depressão (transform: scale(0.98))
- **Loading state**: skeleton loader com gradient animado nas cores do tema
- **Empty state**: mensagem centralizada com ícone astronômico suave

## Considerações de Acessibilidade

- Contraste mínimo 4.5:1 entre texto e fundo
- Focus states visíveis em todos os elementos interativos
- Texto alternativo obrigatório nas imagens de posts
- Tamanho de fonte respeitando `prefers-reduced-motion` e zoom do browser

---

*Design criado para transmitir a maravilhosa vastidão do cosmos mantendo a usabilidade esperada em um site de notícias - onde o usuário consegue escanear rapidamente os headlines e mergulhar nos artigos que mais lhe interessam.*