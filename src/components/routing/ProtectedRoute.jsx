// ProtectedRoute.jsx
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router'
import { UserAuthContext } from '../../context/UserAuthContext'

export function ProtectedRoute() {
    const { isAuthenticated } = useContext(UserAuthContext)
    if (!isAuthenticated) return <Navigate to="/" replace />
    return <Outlet />
}