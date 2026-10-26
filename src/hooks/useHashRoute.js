import { useCallback, useEffect, useState } from 'react';

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};

const getHashPath = () => {
  const raw = window.location.hash.replace(/^#/, '');
  if (!raw) return '/';
  return raw.startsWith('/') ? raw : `/${raw}`;
};

export function parseRoute(path) {
  const clean = (path || '/').split('?')[0].replace(/\/+$/, '') || '/';

  if (clean === '/') {
    return { name: 'home', path: '/' };
  }

  const postMatch = /^\/post\/([^/]+)$/.exec(clean);
  if (postMatch) {
    return { name: 'post', path: clean, slug: safeDecode(postMatch[1]) };
  }

  const categoryMatch = /^\/categoria\/([^/]+)$/.exec(clean);
  if (categoryMatch) {
    return { name: 'category', path: clean, category: safeDecode(categoryMatch[1]) };
  }

  if (clean === '/sobre') {
    return { name: 'about', path: clean };
  }

  return { name: 'notfound', path: clean };
}

/**
 * Roteamento por hash, sem dependência externa.
 * Devolve a rota atual e uma função navigate(path) que atualiza o hash.
 */
export function useHashRoute() {
  const [path, setPath] = useState(getHashPath);

  useEffect(() => {
    const handleHashChange = () => setPath(getHashPath());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const navigate = useCallback((nextPath) => {
    const normalized = nextPath.startsWith('/') ? nextPath : `/${nextPath}`;
    const nextHash = `#${normalized}`;

    if (window.location.hash === nextHash) {
      window.scrollTo(0, 0);
      return;
    }

    window.location.hash = nextHash;
  }, []);

  return { path, route: parseRoute(path), navigate };
}

export default useHashRoute;
