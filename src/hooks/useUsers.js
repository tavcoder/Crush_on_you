// hooks/useCurrentUser.js
import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import {
    getUsers,
    searchUsers,
    getUserById,
    updateProfile,
    followUser,
    unfollowUser,
    getCurrentUser,
} from "../services/api/users.api.js";

export function useCurrentUser() {
    const context = useContext(UserAuthContext);
    if (!context) throw new Error("useCurrentUser debe usarse dentro de UserAuthProvider");

    return useQuery({
        queryKey: ["users", "me"],
        queryFn: getCurrentUser,
        enabled: !!context.currentUser?.id,
    });
}

export function useUser(userId) {
    return useQuery({
        queryKey: ["users", userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
    });
}

export function useUsers(page = 1) {
    return useQuery({
        queryKey: ["users", "list", page],
        queryFn: () => getUsers({ page }),
        onSuccess: (data) => {
            console.log("users data:", data)
        },
    });
}

export function useSearchUsers(query) {
    return useQuery({
        queryKey: ["users", "search", query],
        queryFn: () => searchUsers(query),
        enabled: query?.length >= 2,
        staleTime: 1000 * 30,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
    });
}

export function useFollowUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: followUser,
        onSuccess: (_, userId) => {
            queryClient.invalidateQueries({ queryKey: ["users", userId] });
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
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
            queryClient.invalidateQueries({ queryKey: ["users", "me"] });
            queryClient.invalidateQueries({ queryKey: ["users", "list"] });
        },
    });
}