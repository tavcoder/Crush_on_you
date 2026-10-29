// hooks/useOnlineUsers.js
import { useContext, useMemo } from 'react'
import { UserAuthContext } from '../context/UserAuthContext.jsx'
import { useFollowing } from './useFollows.js'

// TODO: [DEUDA TÉCNICA] Solo la primera página de seguidos (5). Una lista real de
// "en línea" necesita un endpoint de presencia.
export function useOnlineUsers() {
    const { currentUser } = useContext(UserAuthContext)
    const { following, isLoading, isError, isSuccess, error } = useFollowing(currentUser?.id)

    const onlineUsers = useMemo(
        () => following.filter(user => user.isOnline),
        [following]
    )

    return { onlineUsers, isLoading, isError, isSuccess, error }
}