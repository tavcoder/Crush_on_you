// context/UserAuthContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { getToken } from '../services/apiClient';

export const UserAuthContext = createContext(null);

// context/UserAuthContext.jsx — SIMPLIFICADO
export function UserAuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        setIsAuthenticated(!!token);
        setIsLoading(false);
    }, []);

    const login = useCallback((token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }, []);

    return (
        <UserAuthContext value={{ isAuthenticated, isLoading, login, logout }}>
            {children}
        </UserAuthContext>
    );
}
