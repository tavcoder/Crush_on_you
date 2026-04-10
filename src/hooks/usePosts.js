// hooks/usePosts.js
import { useState, useEffect, useCallback } from 'react';
import { getPosts } from '../services/apiHelper';

export function usePosts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        getPosts({ page, limit: 10 })
            .then(({ data, pagination }) => {
                setPosts(prev => [...prev, ...data]);
                setHasMore(pagination.currentPage < pagination.totalPages);
            })
            .finally(() => setLoading(false));
    }, [page]);

    const loadMore = useCallback(() => {
        if (!isLoading && hasMore) {
            setPage(prev => prev + 1);
        }
    }, [isLoading, hasMore]);

    return { posts, isLoading, hasMore, loadMore };
}