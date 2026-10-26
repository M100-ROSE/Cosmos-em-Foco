import { useEffect, useRef, useState } from 'react';
import { getPosts } from '../services/postsApi.js';

const DEFAULT_PAGE_SIZE = 6;

/**
 * Lista de posts com busca, categoria e paginação incremental.
 * Descarta respostas fora de ordem com a flag `active` no cleanup.
 */
export function usePosts({ query = '', category = 'todas', pageSize = DEFAULT_PAGE_SIZE } = {}) {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState({ query, category });
  const loadingRef = useRef(true);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  if (appliedFilters.query !== query || appliedFilters.category !== category) {
    setAppliedFilters({ query, category });
    setPage(1);
    setItems([]);
    setTotal(0);
    setHasMore(false);
    setLoading(true);
    setError(null);
  }

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);

    getPosts({ query, category, page, pageSize })
      .then((result) => {
        if (!active) return;
        setItems((previous) => (page === 1 ? result.items : [...previous, ...result.items]));
        setTotal(result.total);
        setHasMore(result.hasMore);
        setLoading(false);
      })
      .catch((requestError) => {
        if (!active) return;
        setError(requestError);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query, category, page, pageSize, reloadToken]);

  const loadMore = () => {
    if (loadingRef.current || !hasMore || error) return;
    loadingRef.current = true;
    setPage((current) => current + 1);
  };

  const retry = () => setReloadToken((token) => token + 1);

  return { items, total, page, hasMore, loading, error, loadMore, retry };
}

export default usePosts;
