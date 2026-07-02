// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router'
import { getToken } from '../../services/apiClient'

export function ProtectedRoute() {
    const token = getToken()
    if (!token) return <Navigate to="/" replace />
    return <Outlet />
}