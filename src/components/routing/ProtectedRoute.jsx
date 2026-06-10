// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router'
import { useCurrentUser } from '../../hooks/useUsers'

export function ProtectedRoute() {
    const { data: currentUser, loading } = useCurrentUser()

    if (loading) return null // o un spinner
    if (!currentUser) return <Navigate to="/" replace />

    return <Outlet />
}