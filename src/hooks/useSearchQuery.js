/*useSearchQuery.js*/
import { useCallback } from 'react'
import { useLocation, useSearchParams, useNavigate } from 'react-router'


export function useSearchQuery() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const query = searchParams.get('q') ?? ''

    const setQuery = useCallback((value) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('q', value)
        } else {
            params.delete('q')
        }
        const qs = params.toString()
        navigate(qs ? `${pathname}?${qs}` : pathname, { replace: true })
    }, [searchParams, pathname, navigate])

    const clearQuery = useCallback(() => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        const qs = params.toString()
        navigate(qs ? `${pathname}?${qs}` : pathname, { replace: true })
    }, [searchParams, pathname, navigate])

    return { query, setQuery, clearQuery }
}