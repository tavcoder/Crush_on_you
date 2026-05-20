// context/UserAuthContext.jsx
import { createContext, useState, useCallback } from "react"
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getToken } from '../services/apiClient'
import { getCurrentUser } from '../services/api/users.api'

export const UserAuthContext = createContext(null)

export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken())
    const queryClient = useQueryClient()

    // TanStack Query maneja la petición a users/me
    const { data: currentUser, isLoading } = useQuery({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        enabled: isAuthenticated,  // ← solo lanza la petición si hay sesión
        staleTime: 1000 * 60 * 5,  // 5 minutos — el perfil no cambia cada segundo
    })

    const login = useCallback(async (token) => {
        localStorage.setItem('token', token)
        setIsAuthenticated(true)
        // TanStack Query relanzará getCurrentUser automáticamente
        // porque isAuthenticated cambia a true
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        queryClient.clear()  // ← limpia toda la caché al cerrar sesión
    }, [queryClient])

    return (
        <UserAuthContext value={{ isAuthenticated, isLoading, currentUser, login, logout }}>
            {children}
        </UserAuthContext>
    )
}