// hooks/useFollowing.js
import { useContext } from 'react'
import { useQueries } from '@tanstack/react-query'
import { UserAuthContext } from '../context/UserAuthContext'
import { userQueryOptions } from './useUsers'

export function useFollowing() {
    const { currentUser } = useContext(UserAuthContext)
    // useQueries lanza N queries en paralelo — equivalente al Promise.all
    const results = useQueries({
        queries: (currentUser?.following ?? []).map(({ userId }) => userQueryOptions(userId))
    })

    return {
        following: results.map(r => r.data).filter(Boolean),
        loading: results.some(r => r.isLoading),
        error: results.find(r => r.error)?.error ?? null,
    }
}