import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUsers,
    getUserSuggestions,
    searchUsers,
    getUserById,
    getUserStats,
    updateProfile,
    uploadAvatar,
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
export function useUserSuggestions(enabled = true, page = 1) {
    const query = useQuery({                           // ← conecta con React Query
        queryKey: ["users", "suggestions", page],
        queryFn: () => getUserSuggestions({ page }),
        enabled: enabled,
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
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
}

