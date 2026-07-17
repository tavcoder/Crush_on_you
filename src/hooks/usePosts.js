// hooks/usePosts.js
import { useContext } from "react";
import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { getPosts, createPost, getPostsByUser, searchPosts } from '../services/api/posts.api.js'
import { UserAuthContext } from "../context/UserAuthContext.jsx";

/**
 * Forma base compartida por los hooks de posts paginados con scroll infinito.
 *
 * @typedef {Object} UseInfinitePostsBase
 * @property {() => void} fetchNextPage
 * @property {boolean} hasNextPage
 * @property {boolean} isLoading           - true solo durante la carga inicial
 * @property {boolean} isFetchingNextPage  - true mientras se carga una página adicional
 * @property {boolean} isError
 * @property {unknown} error
 */

function getNextPageParam(lastPage) {
    const current = lastPage.pagination?.currentPage ?? 1
    const total = lastPage.pagination?.totalPages ?? 1
    return current < total ? current + 1 : undefined
}

/**
 * Resultado de `usePosts` — feed general, con capacidad de crear posts.
 *
 * @typedef {UseInfinitePostsBase & {
 *   posts: import('../services/contracts/types.js').Post[],
 *   addPost: (data: { content: string, files?: File[] }) => void,
 *   isAddingPost: boolean
 * }} UsePostsResult
 */

export function usePosts() {
    const { currentUser } = useContext(UserAuthContext)
    const queryClient = useQueryClient()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['posts', 'feed'],
        queryFn: ({ pageParam }) => getPosts({ page: pageParam }, currentUser?.id),
        getNextPageParam,
        initialPageParam: 1,
    })

    const posts = data?.pages.flatMap((page) => page.data) ?? []

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const newPost = response.publicationStored

            queryClient.setQueryData(['posts', 'feed'], (old) => {
                // Caso A: todavía no hay cache para este feed (nadie lo ha cargado nunca)
                if (!old) {
                    return {
                        pages: [{ data: [newPost], pagination: { currentPage: 1, totalPages: 1 } }],
                        pageParams: [1],
                    }
                }

                // Caso B: ya hay páginas cargadas -> solo prepend en pages[0]
                return {
                    ...old,
                    pages: old.pages.map((pageData, index) =>
                        index === 0
                            ? { ...pageData, data: [newPost, ...pageData.data] }
                            : pageData
                    ),
                }
            })

            queryClient.invalidateQueries({ queryKey: ['posts', 'byUser'] })
            queryClient.invalidateQueries({ queryKey: ['posts', 'detail'] })
        },
    })

    return {
        posts,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
        addPost: mutation.mutate,
        isAddingPost: mutation.isPending,
    }
}

/**
 * Resultado de `useUserPosts` — posts de un usuario concreto, solo lectura.
 *
 * @typedef {UseInfinitePostsBase & {
 *   posts: import('../services/contracts/types.js').Post[]
 * }} UseUserPostsResult
 */

export function useUserPosts(userId) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['posts', 'byUser', userId],
        queryFn: ({ pageParam }) => getPostsByUser(userId, { page: pageParam }),
        getNextPageParam,
        initialPageParam: 1,
        enabled: !!userId && typeof userId === 'string',
    })

    const posts = data?.pages.flatMap((page) => page.data) ?? []

    return {
        posts,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
    }
}

/**
 * Resultado de `useSearchPosts` — resultados de búsqueda por texto.
 *
 * @typedef {UseInfinitePostsBase & {
 *   results: import('../services/contracts/types.js').Post[]
 * }} UseSearchPostsResult
 */
export function useSearchPosts(queryText, { enabled } = {}) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['posts', 'search', queryText],
        queryFn: ({ pageParam }) => searchPosts({ search: queryText, page: pageParam }),
        getNextPageParam,
        initialPageParam: 1,
        enabled: enabled ?? queryText.trim().length >= 2,
        staleTime: 1000 * 30,
    })

    const posts = data?.pages.flatMap((page) => page.data) ?? []

    return {
        posts,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isError,
        error,
    }
}