// context/UserAuthContext.jsx
import { createContext, useState, useCallback } from "react"
import { useQueryClient } from '@tanstack/react-query'
import { getToken, saveToken } from '../services/apiClient'
import { useUser } from '../hooks/useUsers.js'

export const UserAuthContext = createContext(null)

export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())
    const queryClient = useQueryClient()
    const [userId, setUserId] = useState(() => {
        const stored = localStorage.getItem('userId')
        return stored && stored !== 'undefined' ? stored : null
    })
    const { data: currentUser, isLoading } = useUser(userId)

    const login = useCallback(async (token, userId) => {
        saveToken(token)
        if (userId) localStorage.setItem('userId', userId)  // ← guard
        setUserId(userId)
        await queryClient.invalidateQueries({ queryKey: ['users', userId] })
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