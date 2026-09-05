import { useLocation, useSearchParams, useNavigate } from 'react-router'


export function useSearchQuery() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const query = searchParams.get('q') ?? ''

    const setQuery = (value) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('q', value)
        } else {
            params.delete('q')
        }
        navigate(`${pathname}?${params.toString()}`, { replace: true })
    }

    const clearQuery = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        navigate(`${pathname}?${params.toString()}`, { replace: true })
    }

    return { query, setQuery, clearQuery }
}