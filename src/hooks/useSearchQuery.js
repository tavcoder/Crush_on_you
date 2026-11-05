// hooks/useSearchQuery.js
import { useCallback } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router'

export function useSearchQuery() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const query = searchParams.get('q') ?? ''
    const page = Number(searchParams.get('page')) || 1

    const go = useCallback((params) => {
        const qs = params.toString()
        navigate(qs ? `${pathname}?${qs}` : pathname, { replace: true })
    }, [pathname, navigate])

    // Cambiar el texto vuelve a la página 1
    const setQuery = useCallback((value) => {
        const params = new URLSearchParams(searchParams)
        if (value) params.set('q', value)
        else params.delete('q')
        params.delete('page')
        go(params)
    }, [searchParams, go])

    const clearQuery = useCallback(() => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        params.delete('page')
        go(params)
    }, [searchParams, go])

    const setPage = useCallback((value) => {
        const params = new URLSearchParams(searchParams)
        if (value > 1) params.set('page', String(value))
        else params.delete('page')
        go(params)
    }, [searchParams, go])

    return { query, page, setQuery, clearQuery, setPage }
}