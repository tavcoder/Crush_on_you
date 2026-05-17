// hooks/usePosts.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPosts, createPost, getPostsByUser } from '../services/api/posts.api'

export function useUserPosts(userId) {
    return useQuery({
        queryKey: ["posts", "byUser", userId],
        queryFn: () => getPostsByUser(userId),
        enabled: !!userId && typeof userId === 'string',
    });
}

export function usePosts({ page = 1 } = {}) {
    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['posts', page],
        queryFn: () => getPosts({ page }),
    })

    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: (newPost) => {
            queryClient.setQueryData(['posts', page], (old) => {
                if (!old) {
                    return { data: [newPost], pagination: null }
                }

                return {
                    ...old,
                    data: [newPost, ...(old.data ?? [])],
                }
            })
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