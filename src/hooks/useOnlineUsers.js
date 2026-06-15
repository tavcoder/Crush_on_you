// hooks/useOnlineUsers.js
import { useMemo } from 'react'
import { useFollowing } from './useFollowing'

export function useOnlineUsers() {
    const { following, isLoading, isError, error } = useFollowing()

    const onlineUsers = useMemo(() =>
        following?.filter(user => user.isOnline),
        [following]
    )
    return {
        onlineUsers,
        isLoading,
        isError,
        error,
    }
}