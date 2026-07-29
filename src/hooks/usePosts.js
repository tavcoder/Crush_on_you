// hooks/usePosts.js
import { useContext } from "react";
import { useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { getPosts, createPost, getPostsByUser, searchPosts, likePost, bookmarkPost } from '../services/api/posts.api.js'
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
    const { currentUser } = useContext(UserAuthContext)

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (response) => {
            const newPost = {
                ...response.publicationStored,
                author: currentUser
            }

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

            if (response.imageUploadFailed) {
                alert('Your post was published successfully, but the image couldn\'t be uploaded. Please try uploading the image again.')
            }
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
        queryKey: ['posts', 'byUser', userId],
        queryFn: ({ pageParam }) => getPostsByUser(userId, { page: pageParam }, currentUser?.id), // ← 3er arg
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
        queryKey: ['posts', 'search', queryText],
        queryFn: ({ pageParam }) => searchPosts({ search: queryText, page: pageParam },currentUser?.id), // ← 2do arg
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

export function useLikePost() {
    const queryClient = useQueryClient();

    // Togglea un post individual, sin importar si viene suelto
    // o dentro de una lista paginada { publications: [...] }
    const toggleLikeInData = (data, postId) => {
        if (!data) return data;

        // Caso: respuesta paginada con array de publications
        if (Array.isArray(data.pages)) {
            return {
                ...data,
                pages: data.pages.map((page) => ({
                    ...page,
                    data: page.data.map((post) =>
                        post._id === postId || post.id === postId
                            ? {
                                ...post,
                                isLiked: !post.isLiked,
                                stats: {
                                    ...post.stats,
                                    likesCount: post.isLiked ? post.stats.likesCount - 1 : post.stats.likesCount + 1
                                }
                            }
                            : post
                    )
                }))
            };
        }

        // Caso: post individual (ej. ['posts', 'detail', postId])
        if (data._id === postId || data.id === postId) {
            return {
                ...data,
                isLiked: !data.isLiked,
                stats: {
                    ...data.stats,
                    likesCount: data.isLiked ? data.stats.likesCount - 1 : data.stats.likesCount + 1
                }
            };
        }

        return data;
    };

    return useMutation({
        mutationFn: (postId) => likePost(postId),

        onMutate: async (postId) => {
            // Cancela cualquier query relacionada a posts que esté en vuelo
            await queryClient.cancelQueries({ queryKey: ['posts'] });

            // Snapshot de TODAS las queries bajo 'posts' (sin importar cuál esté montada)
            const previousQueries = queryClient.getQueriesData({ queryKey: ['posts'] });

            // Aplica el toggle optimista en cualquier query que contenga este post
            queryClient.setQueriesData({ queryKey: ['posts'] }, (old) =>
                toggleLikeInData(old, postId)
            );

            return { previousQueries };
        },

        onError: (err, postId, context) => {
            // Restaura cada query exactamente a su snapshot previo
            context?.previousQueries?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
        },

        onSettled: () => {
            // Revalida todo lo relacionado a posts para corregir
            // cualquier drift (ej. likesCount desincronizado)
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
}

export function useBookmarkPost() {
    const queryClient = useQueryClient();

    // Togglea un post individual, sin importar si viene suelto
    // o dentro de una lista paginada { publications: [...] }
    const toggleBookmarkInData = (data, postId) => {
        if (!data) return data;

        // Caso: respuesta paginada con array de publications
        if (Array.isArray(data.pages)) {
            return {
                ...data,
                pages: data.pages.map((page) => ({
                    ...page,
                    data: page.data.map((post) =>
                        post._id === postId || post.id === postId
                            ? {
                                ...post,
                                isBookmarked: !post.isBookmarked,
                            }
                            : post
                    )
                }))
            };
        }

        // Caso: post individual (ej. ['posts', 'detail', postId])
        if (data._id === postId || data.id === postId) {
            return {
                ...data,
                isBookmarked: !data.isBookmarked,
            };
        }

        return data;
    };

    return useMutation({
        mutationFn: (postId) => bookmarkPost(postId),

        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['posts'] });

            const previousQueries = queryClient.getQueriesData({ queryKey: ['posts'] });

            queryClient.setQueriesData({ queryKey: ['posts'] }, (old) =>
                toggleBookmarkInData(old, postId)
            );

            return { previousQueries };
        },

        onError: (err, postId, context) => {
            context?.previousQueries?.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
        },

        onSettled: () => {

            queryClient.invalidateQueries({ queryKey: ['posts'] });
        }
    });
}
