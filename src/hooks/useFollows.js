// hooks/useFollows.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFollowers, getFollowing, followUser, unfollowUser } from '../services/api/follow.api.js'
import { UserAuthContext } from "../context/UserAuthContext.jsx";
import { useContext } from "react";

/**
 * Lista paginada de usuarios que siguen al usuario indicado.
 * useQuery simple (no infinite scroll) — decisión consciente para MVP,
 * mismo criterio que useSearchUsers. Se puede promover a useInfiniteQuery
 * más adelante si la UI lo requiere.
 *
 * // TODO: [DEUDA TÉCNICA] useFollowUser/useUnfollowUser (en useUsers.js)
 * // no invalidan la queryKey ['follows', ...]. Si estás viendo la lista
 * // de followers/following de alguien y en paralelo sigues/dejas de
 * // seguir a otra persona relacionada, esta lista no se refresca sola
 * // hasta un refetch manual. Pendiente agregar
 * // invalidateQueries({ queryKey: ['follows'] }) a ambas mutaciones
 * // una vez cerrada la feature de navegación del sidebar.
 *
 * @param {string} userId
 * @param {number} [page]
 * @param {boolean} [enabled] - permite desactivar la query externamente
 *   (ej. cuando PeoplePage solo quiere activar el hook del `type` actual)
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../services/contracts/types.js').PaginatedUsers> & {
 *   followers: import('../services/contracts/types.js').User[]
 * }}
 */
export function useFollowers(userId, page = 1, enabled = true) {
    const query = useQuery({
        queryKey: ['follows', 'followers', userId, page],
        queryFn: () => getFollowers(userId, { page }),
        enabled: !!userId && typeof userId === 'string' && enabled,
    })

    return {
        ...query,
        followers: query.data?.data ?? [],
        pagination: query.data?.pagination,
    }
}

/**
 * Lista paginada de usuarios a los que sigue el usuario indicado.
 * useQuery simple (no infinite scroll) — mismo criterio que useFollowers.
 * Ver TODO en useFollowers sobre invalidación pendiente de cache.
 *
 * @param {string} userId
 * @param {number} [page]
 * @returns {import('@tanstack/react-query').UseQueryResult<import('../services/contracts/types.js').PaginatedUsers> & {
 *   following: import('../services/contracts/types.js').User[]
 * }}
 */
export function useFollowing(userId, page = 1, enabled = true) {
    const query = useQuery({
        queryKey: ['follows', 'following', userId, page],
        queryFn: () => getFollowing(userId, { page }),
        enabled: !!userId && typeof userId === 'string' && enabled,
    })

    return {
        ...query,
        following: query.data?.data ?? [],
        pagination: query.data?.pagination,
    }
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
            // Cancelar las 3 queries por separado
            await queryClient.cancelQueries({ queryKey: ["users", currentUser.id] })
            await queryClient.cancelQueries({ queryKey: ["userStats", userId] })
            await queryClient.cancelQueries({ queryKey: ["userStats", currentUser.id] })

            // Snapshot de cada una por separado
            const previousUser = queryClient.getQueryData(["users", currentUser.id])
            const previousTargetStats = queryClient.getQueryData(["userStats", userId])
            const previousOwnStats = queryClient.getQueryData(["userStats", currentUser.id])

            // Update optimista de mi lista de following (users)
            queryClient.setQueryData(["users", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    following: [...(old.following ?? []), { userId }]
                }
            })

            // Update optimista: al usuario seguido le sube followersCount
            queryClient.setQueryData(["userStats", userId], (old) => {
                if (!old) return old
                return {
                    ...old,
                    followersCount: (old.followersCount ?? 0) + 1
                }
            })

            // Update optimista: a mí me sube followingCount
            queryClient.setQueryData(["userStats", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    followingCount: (old.followingCount ?? 0) + 1
                }
            })

            return { previousUser, previousTargetStats, previousOwnStats }
        },
        onError: (err, userId, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["users", currentUser.id], context.previousUser)
            }
            if (context?.previousTargetStats) {
                queryClient.setQueryData(["userStats", userId], context.previousTargetStats)
            }
            if (context?.previousOwnStats) {
                queryClient.setQueryData(["userStats", currentUser.id], context.previousOwnStats)
            }
        },
        onSettled: (data, error, userId) => {
            queryClient.invalidateQueries({ queryKey: ["users", currentUser.id] })
            queryClient.invalidateQueries({ queryKey: ["userStats", userId] })
            queryClient.invalidateQueries({ queryKey: ["userStats", currentUser.id] })
            queryClient.invalidateQueries({ queryKey: ["posts"] })
            queryClient.invalidateQueries({ queryKey: ["follows"] })
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
            await queryClient.cancelQueries({ queryKey: ["userStats", userId] })
            await queryClient.cancelQueries({ queryKey: ["userStats", currentUser.id] })

            const previousUser = queryClient.getQueryData(["users", currentUser.id])
            const previousTargetStats = queryClient.getQueryData(["userStats", userId])
            const previousOwnStats = queryClient.getQueryData(["userStats", currentUser.id])

            queryClient.setQueryData(["users", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    following: old.following.filter(f => f.userId !== userId)
                }
            })

            queryClient.setQueryData(["userStats", userId], (old) => {
                if (!old) return old
                return {
                    ...old,
                    followersCount: (old.followersCount ?? 0) - 1
                }
            })

            queryClient.setQueryData(["userStats", currentUser.id], (old) => {
                if (!old) return old
                return {
                    ...old,
                    followingCount: (old.followingCount ?? 0) - 1
                }
            })
            return { previousUser, previousTargetStats, previousOwnStats }
        },
        onError: (err, userId, context) => {
            if (context?.previousUser) {
                queryClient.setQueryData(["users", currentUser.id], context.previousUser)
            }
            if (context?.previousTargetStats) {
                queryClient.setQueryData(["userStats", userId], context.previousTargetStats)
            }
            if (context?.previousOwnStats) {
                queryClient.setQueryData(["userStats", currentUser.id], context.previousOwnStats)
            }
        },
        onSettled: (data, error, userId) => {
            queryClient.invalidateQueries({ queryKey: ["users", currentUser.id] })
            queryClient.invalidateQueries({ queryKey: ["userStats", userId] })
            queryClient.invalidateQueries({ queryKey: ["userStats", currentUser.id] })
            queryClient.invalidateQueries({ queryKey: ["follows"] })

        }
    });
}