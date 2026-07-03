import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import {
    getUsers,
    getUserSuggestions,
    searchUsers,
    getUserById,
    updateProfile,
    uploadAvatar,
    followUser,
    unfollowUser,
} from "../services/api/users.api.js";

// ─── QUERIES ───

export function useUser(userId) {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId && typeof userId === 'string',
    });
}

export function useUsers(page = 1) {
    return useQuery({
        queryKey: ["users", "list", page],
        queryFn: () => getUsers({ page }),
    });
}

export function useSearchUsers(query, { enabled } = {}) {
    return useQuery({
        queryKey: ['users', 'search', query],
        queryFn: () => searchUsers({ search: query }),
        enabled: enabled ?? query.trim().length >= 2,
        staleTime: 1000 * 30,
        placeholderData: (prev) => prev,
    })
}

export function useUsersList(page = 1) {
    const query = useUsers(page);
    return {
        ...query,
        users: query.data?.data ?? [],
        pagination: query.data?.pagination,
    };
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

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => updateProfile(id, data),
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(["currentUser"], updatedUser);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
}

export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, file }) => uploadAvatar(id, file),
        onSuccess: (data, variables) => {
            // Invalida queries relacionadas para refrescar datos
            queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
            queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        },
    });
}

export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: followUser,
        onMutate: async (userId) => {
            // 1. Cancela fetches en vuelo para evitar que sobreescriban el update
            await queryClient.cancelQueries({ queryKey: ["currentUser"] })

            // 2. Guarda el estado actual como snapshot para el rollback
            const previousUser = queryClient.getQueryData(["currentUser"])

            // 3. Actualiza la caché optimistamente
            queryClient.setQueryData(["currentUser"], (old) => ({
                ...old,
                following: [...old.following, { userId }]  // añade el nuevo following
            }))

            // 4. Devuelve el snapshot — React Query lo pasa a onError como context
            return { previousUser }
        },
        onError: (err, userId, context) => {
            queryClient.setQueryData(["currentUser"], context.previousUser)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
        }
    });
}

export function useUnfollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unfollowUser,
        onMutate: async (userId) => {
            await queryClient.cancelQueries({ queryKey: ["currentUser"] })
            const previousUser = queryClient.getQueryData(["currentUser"])
            queryClient.setQueryData(["currentUser"], (old) => ({
                ...old,
                following: old.following.filter(f => f.userId !== userId)
            }))
            return { previousUser }
        },
        onError: (err, userId, context) => {
            queryClient.setQueryData(["currentUser"], context.previousUser)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] })
        }
    });
}
