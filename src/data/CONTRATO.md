# Contrato de dados — Cosmos em Foco

Documento de referência para o front-end (Anna). Tudo aqui é ESM, sem dependências
externas e sem TypeScript. Os dados são estáticos, mas a API é assíncrona (simula
latência de rede de **180–400 ms**), então a UI deve tratar `loading`, `error` e
respostas fora de ordem.

## Arquivos

| Arquivo | Conteúdo |
| --- | --- |
| `src/data/posts.js` | `posts` (array com 9 posts) e `default` equivalente. |
| `src/data/categories.js` | `categories` (array com `todas` + 5 categorias e `count`) e `CATEGORY_LABELS`. |
| `src/services/postsApi.js` | Funções assíncronas de consulta (`getPosts`, `getFeaturedPost`, `getPostBySlug`, `getCategories`, `getRelatedPosts`). |
| `src/utils/formatDate.js` | `formatDate(isoDate)` (named e default). |

> `src/data/samplePosts.js` continua existindo por decisão do time, mas **não é usado
> por esta camada**. Não importe ele nos componentes novos.

## Shape de Post

```js
{
  id: '1',
  slug: 'o-misterio-das-galaxias-espirais',
  title: 'O Mistério das Galáxias Espirais',
  excerpt: 'Resumo de 1 a 2 frases, entre 120 e 200 caracteres.',
  content: [
    { type: 'paragraph', text: '...' },
    { type: 'heading', text: '...' },
    { type: 'quote', text: '...', cite: '...' },
    { type: 'list', items: ['...', '...'] }
  ],
  category: 'galaxias',
  categoryLabel: 'Galáxias',
  author: 'Marina Vasconcelos Andrade',
  authorRole: 'Astrofísica e divulgadora científica',
  date: '2026-10-14',
  readingTime: 4,
  imageCover: 'https://images-assets.nasa.gov/image/PIA23122/PIA23122~orig.jpg',
  imageAlt: 'Descrição acessível em pt-BR',
  imageCredit: 'NASA/JPL-Caltech',
  tags: ['galáxias', 'via láctea'],
  featured: true
}
```

Regras:

- `id` é string numérica (`'1'`…`'9'`), estável.
- `date` é sempre ISO `YYYY-MM-DD`, entre julho e outubro de 2026, sem repetição.
- `readingTime` em minutos, calculado a 200 palavras/min.
- Exatamente **1** post tem `featured: true`.
- `content` tem de 7 a 12 blocos; cada bloco tem um dos 4 `type` acima.
  - `paragraph`: `text`
  - `heading`: `text` (subtítulo, não use `<h1>`)
  - `quote`: `text` + `cite`
  - `list`: `items` (array de strings)
- `imageCover` aponta para `images-assets.nasa.gov`. Se uma imagem não carregar,
  use o fallback visual planejado — não troque a URL no dado.
- Datas exibidas: use **sempre** `formatDate(post.date)`; nunca `new Date(post.date)
  .toLocaleDateString()`, para não variar com o locale do navegador.

## Shape de Categoria

```js
{ id: 'todas', label: 'Todas', count: 9 }
{ id: 'galaxias', label: 'Galáxias', count: 2 }
```

Ids válidos: `todas`, `galaxias`, `sistema-solar`, `observacao`, `cosmologia`,
`tecnologia`. `todas` tem `count` igual ao total de posts. A ordem do array é:
`todas`, `galaxias`, `sistema-solar`, `observacao`, `cosmologia`, `tecnologia`.

## API

Todas as funções retornam `Promise` e resolvem após 180–400 ms.

### `getPosts({ query, category, page, pageSize })`

```js
getPosts({ query: 'galaxias', category: 'todas', page: 1, pageSize: 6 })
```

- Retorno: `{ items: Post[], total: number, page: number, pageSize: number, hasMore: boolean }`
- `items` são posts **completos** (incluem `content`) — o front pode ignorar o campo
  nas listagens.
- Ordenação: `date` decrescente.
- `query`: busca **case-insensitive e sem acento** em `title`, `excerpt`, `tags` e
  `author`. Espaços nas pontas são ignorados; string vazia não filtra.
- `category`: `'todas'` (default) não filtra. Categoria desconhecida resulta em
  `items: []` e `total: 0`.
- `page`: 1-based. Valores inválidos caem para `1`; página além do fim devolve
  `items: []` e `hasMore: false`.
- `pageSize`: default `6`, limitado a `50`. `hasMore` é
  `page * pageSize < total`.

### `getFeaturedPost()`

Retorna o post com `featured: true` (completo) ou `null`.

### `getPostBySlug(slug)`

Retorna o post completo (com `content`) ou `null` se não existir. Use no detalhe do
artigo. Se `slug` for vazio, retorna `null`.

### `getCategories()`

Retorna `Categoria[]` com contagem real, na ordem descrita acima.

### `getRelatedPosts(postId, limit = 3)`

Retorna até `limit` posts (default 3, máximo 20), **sem o post atual**, priorizando
a mesma `category` e completando com os mais recentes de outras categorias.
`postId` inexistente devolve `[]`.

## Exemplo rápido

```js
import { getPosts, getPostBySlug } from '../services/postsApi.js';
import { formatDate } from '../utils/formatDate.js';

const { items, total, hasMore } = await getPosts({
  query: 'lua',
  category: 'sistema-solar',
  page: 1,
  pageSize: 6,
});

items[0].title;            // 'Eclipse Lunar Total: a ciência da Lua de Sangue'
formatDate(items[0].date); // '2 de outubro de 2026'
```

## Como a Anna deve consumir

### Lista com busca, categoria e paginação

```jsx
import { useEffect, useState } from 'react';
import { getPosts } from '../services/postsApi.js';

export default function PostList({ query, category, page }) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    hasMore: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true; // cancela a resposta obsoleta no cleanup

    setState((prev) => ({ ...prev, loading: true, error: null }));

    getPosts({ query, category, page, pageSize: 6 })
      .then((result) => {
        if (!active) return; // ignora resposta de requisição antiga
        setState({ ...result, loading: false, error: null });
      })
      .catch((error) => {
        if (!active) return;
        setState((prev) => ({ ...prev, loading: false, error }));
      });

    return () => {
      active = false;
    };
  }, [query, category, page]);

  if (state.loading) return <p>Carregando o cosmos…</p>;
  if (state.error) {
    return (
      <div role="alert">
        Não foi possível carregar os posts.{' '}
        <button onClick={() => window.location.reload()}>Tentar de novo</button>
      </div>
    );
  }
  if (state.items.length === 0) return <p>Nenhum post encontrado.</p>;

  return (
    <>
      {state.items.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{formatDate(post.date)}</p>
        </article>
      ))}
      <p>{state.total} post(s)</p>
    </>
  );
}
```

Pontos importantes:

0. **Extensões explícitas:** o `package.json` tem `"type": "module"`, então o webpack
   trata os `.js` em modo ESM estrito. Importe sempre com extensão
   (`../services/postsApi.js`, `../utils/formatDate.js`), como nos exemplos acima.
1. **Cancelamento:** a API não recebe `AbortSignal` (contrato fixo). Use a flag
   `active` no cleanup do `useEffect` para descartar respostas antigas quando
   `query`/`category`/`page` mudar rápido. Sem isso, uma resposta lenta pode
   sobrescrever uma busca mais nova.
2. **Debounce da busca:** espere ~300 ms após a digitação antes de atualizar
   `query`, para não disparar uma chamada por tecla.
3. **Loading inicial x recarregamento:** ao trocar de filtro, mantenha a lista
   anterior visível se preferir (basta não limpar `items`), mas sempre mostre algum
   indicador.
4. **Erros:** a API mock não lança em condições normais. Ainda assim, mantenha
   `catch` e uma mensagem com ação de retry, pois o contrato é o de uma API real.
5. **Detalhe do artigo:** carregue por `slug` e trate `null` como 404:

```jsx
const post = await getPostBySlug(slug);
if (!post) { /* renderizar estado "não encontrado" */ }
```

6. **Renderização do content:** use `switch (block.type)`; para `list`, renderize
   `<ul>` com `key={index}` nos `<li>`. Para `heading`, use `<h2>`. Para `quote`,
   `<blockquote>` + `<cite>`.

## Casos de borda

| Situação | Comportamento |
| --- | --- |
| `query: 'galaxias'` | Encontra “Galáxias” (sem acento no termo). |
| `query: '  '` | Não filtra. |
| `category: 'todas'` | Não filtra. |
| Categoria inexistente | `items: []`, `total: 0`. |
| `page` além do fim | `items: []`, `hasMore: false`. |
| `getPostBySlug('nao-existe')` | `null`. |
| `getRelatedPosts('99')` | `[]`. |
| `formatDate('2026-13-01')` | `''`. |
| `formatDate('2026-10-14')` | `'14 de outubro de 2026'`. |

## Observações de conteúdo

- Posts por categoria: `galaxias` 2, `sistema-solar` 2, `observacao` 2,
  `cosmologia` 2, `tecnologia` 1 (total 9).
- O post em destaque é `o-misterio-das-galaxias-espirais` (id `'1'`).
- As URLs de imagem são as validadas pela Monica (domínio público NASA). Se alguma
  falhar no navegador, mantenha o dado e use fallback visual.
- As capas são **ilustrativas**: os arquivos NASA têm temas próprios (Andrômeda,
  centro da Via Láctea, Vênus, Europa, M87, sondas MarCO, rover Perseverance).
  Três capas não correspondem ao tema do artigo (`sistema-solar`/eclipse usa Vênus;
  `cosmologia`/energia escura usa MarCO; `cosmologia`/teia cósmica usa Perseverance).
  Os textos alternativos descrevem a imagem real, não o tema do post. Recomenda-se
  trocar essas três URLs quando houver imagens temáticas disponíveis.
