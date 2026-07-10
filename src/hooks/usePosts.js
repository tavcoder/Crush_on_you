// hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, createPost, getPostsByUser, searchPosts } from '../services/api/posts.api.js'

/**
 * @typedef {Object} UsePostsResult
 * @property {import('../services/contracts/types.js').Post[]} posts
 * @property {import('../services/contracts/types.js').Pagination | undefined} pagination
 * @property {boolean} isLoading
 * @property {boolean} isError
 * @property {unknown} error
 * @property {(data: { content: string, files?: File[] }) => void} addPost
 * @property {boolean} isAddingPost
 */

/**
 * Devuelve publicaciones del feed general.
 *
 * @param {{ page?: number, currentUserId?: string }} [params]
 * @returns {UsePostsResult}
 */
export function usePosts({ page = 1, currentUserId } = {}) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['posts', 'feed', page],
        queryFn: () => getPosts({ page }, currentUserId),
    })

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const newPost = response.publicationStored

            queryClient.setQueryData(['posts', 'feed', page], (old) => {
                if (!old) {
                    return {
                        data: [newPost],
                        pagination: { currentPage: page, totalPages: 1 },
                    }
                }

                return {
                    ...old,
                    data: [newPost, ...(old.data ?? [])],
                }
            })

            queryClient.invalidateQueries({ queryKey: ['posts', 'byUser'] })
            queryClient.invalidateQueries({ queryKey: ['posts', 'detail'] })
        },
    })

    return {
        posts: query.data?.data ?? [],
        pagination: query.data?.pagination,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        addPost: mutation.mutate,
        isAddingPost: mutation.isPending,
    }
}

/**
 * Devuelve publicaciones de un usuario concreto.
 *
 * @param {string} userId
 * @param {{ page?: number, currentUserId?: string }} [params]
 * @returns {UsePostsResult}
 */
export function useUserPosts(userId, { page = 1, currentUserId } = {}) {
    const query = useQuery({
        queryKey: ['posts', 'byUser', userId, page],
        queryFn: () => getPostsByUser(userId, { page }, currentUserId),
        enabled: !!userId && typeof userId === 'string',
        throwOnError: false,
    })

    return {
        posts: query.data?.data ?? [],
        pagination: query.data?.pagination,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        addPost: () => { },
        isAddingPost: false,
    }
}

/**
 * Busca publicaciones por texto.
 *
 * @param {string} queryText
 * @param {{ enabled?: boolean }} [options]
 * @returns {UsePostsResult}
 */
export function useSearchPosts(queryText, { enabled } = {}) {
    const query = useQuery({
        queryKey: ['posts', 'search', queryText],
        queryFn: () => searchPosts({ search: queryText }),
        enabled: enabled ?? queryText.trim().length >= 2,
        staleTime: 1000 * 30,
        placeholderData: (prev) => prev,
    })

    return {
        posts: query.data?.data ?? [],
        pagination: query.data?.pagination,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        addPost: () => { },
        isAddingPost: false,
    }
}