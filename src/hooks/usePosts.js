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
 * Crea publicaciones nuevas y actualiza la cache del feed general.
 * Independiente de si el feed está montado — escribe directamente
 * en la cache de React Query, así que funciona desde cualquier pantalla
 * (feed, perfil, etc.) sin disparar una petición del feed innecesaria.
 *
 * @returns {{ addPost: (data: { content: string, files?: File[] }) => void, isAddingPost: boolean }}
 */
export function useCreatePost() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const newPost = response.publicationStored

            queryClient.setQueryData(['posts', 'feed'], (old) => {
                if (!old) {
                    return {
                        pages: [{ data: [newPost], pagination: { currentPage: 1, totalPages: 1 } }],
                        pageParams: [1],
                    }
                }
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
        addPost: mutation.mutate,
        isAddingPost: mutation.isPending,
    }
}

/**
 * Devuelve publicaciones del feed general del usuario autenticado,
 * paginadas con scroll infinito. Solo lectura — para crear posts, usar `useCreatePost`.
 *
 * @returns {UseInfinitePostsBase & { posts: import('../services/contracts/types.js').Post[] }}
 */
export function usePosts() {
    const { currentUser } = useContext(UserAuthContext)

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