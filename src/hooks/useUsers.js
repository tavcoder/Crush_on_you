import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import {
    getUsers,
    getUserSuggestions,
    searchUsers,
    getUserById,
    getUserStats,
    updateProfile,
    uploadAvatar,
    followUser,
    unfollowUser,
} from "../services/api/users.api.js";

// ─── QUERIES ───
/**
 * @param {string} userId
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../services/contracts/types.js').User>}
 */
export function userQueryOptions(userId) {
    return {
        queryKey: ["users", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId && typeof userId === 'string',
    };
}

export function useUser(userId) {
    return useQuery(userQueryOptions(userId));
}

/**
 * @param {number} page
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../services/contracts/types.js').PaginatedUsers>}
 */
export function useUsers(page = 1) {
    return useQuery({
        queryKey: ["users", "list", page],
        queryFn: () => getUsers({ page }),
    });
}

export function useSearchUsers(query, { enabled } = {}) {
    const userSearch = useQuery({
        queryKey: ['users', 'search', query],
        queryFn: () => searchUsers({ search: query }),
        enabled: enabled ?? query.trim().length >= 2,
        staleTime: 1000 * 30,
        placeholderData: (prev) => prev,
    })
    return {
        ...userSearch,
        users: userSearch.data?.data ?? [],
        pagination: userSearch.data?.pagination,
    }
}

export function useUsersList(page = 1) {
    const query = useUsers(page);
    return {
        ...query,
        users: query.data?.data ?? [],
        pagination: query.data?.pagination,
    };
}
export function useUserStats(userId) {
    return useQuery({
        queryKey: ["userStats", userId],
        queryFn: () => getUserStats(userId),
        enabled: !!userId, 
    })
}
export function useUserSuggestions(page = 1) {
    const query = useQuery({                           // ← conecta con React Query
        queryKey: ["users", "suggestions", page],
        queryFn: () => getUserSuggestions({ page }),
    })
    return {
        ...query,
        users: query.data?.data ?? [],
        pagination: query.data?.pagination,
    }
}

// ─── MUTATIONS ───
/**
 * Actualiza el perfil del usuario autenticado y refresca currentUser + listas.
 *
 * @returns {import('@tanstack/react-query').UseMutationResult<
 *   import('../services/contracts/types.js').User,
 *   unknown,
 *   { data: import('../services/contracts/types.js').User }
 * >}
 */
export function useUpdateProfile() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => updateProfile(data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["users", updatedUser.id], updatedUser);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
    return {
        updateProfile: mutation.mutateAsync,
    }
}

export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (file) => uploadAvatar(file),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["users", updatedUser.id], updatedUser);
            // invalida perfiles de usuarios si los tiene
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}

export function useFollowUser() {
    const queryClient = useQueryClient();
    const { currentUser } = useContext(UserAuthContext);

    return useMutation({
        mutationFn: (userId) => {
            if (!currentUser?.id) {
                throw new Error('No hay usuario autenticado')
            }
            return followUser(userId)
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ["users", currentUser.id] })
            const previousUser = queryClient.getQueryData(["users", currentUser.id])
            queryClient.setQueryData(["users", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    following: [...(old.following ?? []), { userId }]
                }
            })
            return { previousUser }
        },
        onError: (err, userId, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["users", currentUser.id], context.previousUser)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users", currentUser.id] })
        }
    });
}

export function useUnfollowUser() {
    const queryClient = useQueryClient();
    const { currentUser } = useContext(UserAuthContext);

    return useMutation({
        mutationFn: (userId) => {
            if (!currentUser?.id) {
                throw new Error('No hay usuario autenticado')
            }
            return unfollowUser(userId)
        },
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ["users", currentUser.id] })
            const previousUser = queryClient.getQueryData(["users", currentUser.id])
            queryClient.setQueryData(["users", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    following: old.following.filter(f => f.userId !== userId)
                }
            })
            return { previousUser }
        },
        onError: (err, userId, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["users", currentUser.id], context.previousUser)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["users", currentUser.id] })
        }
    });
}