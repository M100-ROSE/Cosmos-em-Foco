// API mock do blog. Simula latência de rede para que a UI exercite estados de
// carregamento/erro como faria com um back-end real. Ver CONTRATO.md.
import { posts } from '../data/posts.js';
import { categories } from '../data/categories.js';

const MIN_LATENCY_MS = 180;
const MAX_LATENCY_MS = 400;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const simulateLatency = () =>
  wait(MIN_LATENCY_MS + Math.floor(Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS + 1)));

/** Remove acentos e caixa para comparação de busca. */
export function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

const cloneBlock = (block) =>
  block.items ? { ...block, items: [...block.items] } : { ...block };

const clonePost = (post) => ({
  ...post,
  content: post.content.map(cloneBlock),
  tags: [...post.tags],
});

const byDateDesc = (a, b) => b.date.localeCompare(a.date);

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

/**
 * Lista paginada e filtrável de posts (data desc).
 * @returns {Promise<{items: object[], total: number, page: number, pageSize: number, hasMore: boolean}>}
 */
export async function getPosts({ query = '', category = 'todas', page = 1, pageSize = 6 } = {}) {
  await simulateLatency();

  const safePage = toPositiveInt(page, 1);
  const safePageSize = Math.min(toPositiveInt(pageSize, 6), 50);
  const normalizedQuery = normalizeText(query);
  const normalizedCategory = String(category ?? 'todas');

  let result = [...posts].sort(byDateDesc);

  if (normalizedCategory !== 'todas') {
    result = result.filter((post) => post.category === normalizedCategory);
  }

  if (normalizedQuery) {
    result = result.filter((post) => {
      const haystack = normalizeText(
        [post.title, post.excerpt, post.author, ...post.tags].join(' '),
      );
      return haystack.includes(normalizedQuery);
    });
  }

  const total = result.length;
  const start = (safePage - 1) * safePageSize;
  const items = result.slice(start, start + safePageSize).map(clonePost);

  return {
    items,
    total,
    page: safePage,
    pageSize: safePageSize,
    hasMore: start + items.length < total,
  };
}

/** @returns {Promise<object|null>} post com featured: true, ou null. */
export async function getFeaturedPost() {
  await simulateLatency();
  const featured = posts.find((post) => post.featured === true);
  return featured ? clonePost(featured) : null;
}

/** @returns {Promise<object|null>} post completo (com content) ou null. */
export async function getPostBySlug(slug) {
  await simulateLatency();
  if (!slug) return null;
  const found = posts.find((post) => post.slug === String(slug));
  return found ? clonePost(found) : null;
}

/** @returns {Promise<Array<{id: string, label: string, count: number}>>} */
export async function getCategories() {
  await simulateLatency();
  return categories.map((category) => ({ ...category }));
}

/**
 * Posts da mesma categoria, sem o próprio post; completa com os mais recentes.
 * @returns {Promise<object[]>}
 */
export async function getRelatedPosts(postId, limit = 3) {
  await simulateLatency();

  const parsedLimit = Number.parseInt(limit, 10);
  const safeLimit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 0), 20)
    : 3;
  const current = posts.find((post) => post.id === String(postId));
  if (!current || safeLimit === 0) return [];

  const sameCategory = posts
    .filter((post) => post.id !== current.id && post.category === current.category)
    .sort(byDateDesc);

  const selectedIds = new Set(sameCategory.map((post) => post.id));

  const fillers = posts
    .filter((post) => post.id !== current.id && !selectedIds.has(post.id))
    .sort(byDateDesc);

  return [...sameCategory, ...fillers].slice(0, safeLimit).map(clonePost);
}
