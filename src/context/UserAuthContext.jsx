// context/UserAuthContext.jsx
import { createContext, useState, useCallback } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getToken, saveToken } from '../services/apiClient'
import { getUserById } from '../services/api/users.api'

export const UserAuthContext = createContext(null)

export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())
    const queryClient = useQueryClient()
    const [userId, setUserId] = useState(() => localStorage.getItem('userId'))

    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['currentUser', userId],
        queryFn: () => getUserById(userId),
        enabled: isAuthenticated && !!userId,
        staleTime: 1000 * 60 * 5,
    })

    const login = useCallback(async (token, userId) => {
        saveToken(token)
        localStorage.setItem('userId', userId)
        setUserId(userId)
        await queryClient.invalidateQueries({ queryKey: ['currentUser'] })
        setIsAuthenticated(true)
    }, [queryClient])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        setIsAuthenticated(false)
        setUserId(null)
        queryClient.clear()
    }, [queryClient])

    return (
        <UserAuthContext value={{ isAuthenticated, isLoading, currentUser, login, logout }}>
            {children}
        </UserAuthContext>
    )
}