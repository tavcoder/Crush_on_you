/** @typedef {import('../services/contracts/types.js').Post} Post */

/**
 * Fuente de posts de una página (usePosts, useUserPosts...).
 * @typedef {Object} FeedSource
 * @property {Post[]} posts
 * @property {boolean} isLoading
 * @property {boolean} isFetchingNextPage
 * @property {boolean} hasNextPage
 * @property {() => void} fetchNextPage
 * @property {unknown} error
 */

/**
 * Forma que devuelve useSearch('posts').
 * @typedef {Object} SearchSource
 * @property {boolean} isSearching
 * @property {string} query
 * @property {Post[]} results
 * @property {boolean} isLoading
 * @property {boolean} isFetchingNextPage
 * @property {boolean} hasNextPage
 * @property {() => void} fetchNextPage
 * @property {unknown} error
 */

/**
 * Decide UNA vez de dónde salen los posts (búsqueda o feed de la página)
 * y devuelve exactamente la forma de las props de <PostFeed>.
 *
 * @param {Object} params
 * @param {FeedSource} params.feed
 * @param {SearchSource} params.search
 * @param {string} params.emptyMessage Mensaje vacío cuando NO hay búsqueda activa
 * @returns {{
 *   posts: Post[],
 *   isInitialLoading: boolean,
 *   isLoadingNextPage: boolean,
 *   canLoadMore: boolean,
 *   onLoadMore: () => void,
 *   error: unknown,
 *   emptyMessage: string,
 * }}
 */
export function selectFeedSource({ feed, search, emptyMessage }) {
    if (search.isSearching) {
        return {
            posts: search.results,
            isInitialLoading: search.isLoading,
            isLoadingNextPage: search.isFetchingNextPage,
            canLoadMore: search.hasNextPage,
            onLoadMore: search.fetchNextPage,
            error: search.error,
            emptyMessage: `No posts match "${search.query}"`,
        }
    }

    return {
        posts: feed.posts,
        isInitialLoading: feed.isLoading,
        isLoadingNextPage: feed.isFetchingNextPage,
        canLoadMore: feed.hasNextPage,
        onLoadMore: feed.fetchNextPage,
        error: feed.error,
        emptyMessage,
    }
}