// hooks/useFollowing.js
import { useContext } from 'react'
import { useQueries } from '@tanstack/react-query'
import { UserAuthContext } from '../context/UserAuthContext'
import { getUserById } from '../services/api/users.api'

export function useFollowing() {
    const { currentUser } = useContext(UserAuthContext)
    // useQueries lanza N queries en paralelo — equivalente al Promise.all
    const results = useQueries({
        queries: (currentUser?.following ?? []).map(({ userId }) => ({
            queryKey: ['user', userId],
            queryFn: () => getUserById(userId),
            enabled: !!currentUser,
            staleTime: 1000 * 60 * 5,
        }))
    })

    return {
        following: results.map(r => r.data).filter(Boolean),
        loading: results.some(r => r.isLoading),
        error: results.find(r => r.error)?.error ?? null,
    }
}