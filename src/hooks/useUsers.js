import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import {
    getCurrentUser,
    getUsers,
    searchUsers,
    getUserById,
    updateProfile,
    followUser,
    unfollowUser,
} from "../services/api/users.api.js";

// ─── QUERIES ───

export function useCurrentUser() {
    const { isAuthenticated } = useContext(UserAuthContext);

    return useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUser, // GET /users/me → devuelve el usuario completo
        enabled: isAuthenticated,
    });
}

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

export function useSearchUsers(query) {
    return useQuery({
        queryKey: ["users", "search", query],
        queryFn: () => searchUsers({ search: query }),
        enabled: query?.length >= 2,
        staleTime: 1000 * 30,
    });
}

export function useUsersList(page = 1) {
    const query = useUsers(page);
    return {
        ...query,
        users: query.data?.data ?? [],
        pagination: query.data?.pagination,
    };
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

export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: followUser,
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ["users", userId] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
    });
}

export function useUnfollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unfollowUser,
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ["users", userId] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
    });
}
