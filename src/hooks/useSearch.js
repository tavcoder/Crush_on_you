// hooks/useSearch.js
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router'
import { postsData } from '../services/mocks/post.mock'
import { usersData } from '../services/mocks/users.mock'

const SEARCH_CONFIG = {
    '/feed': {
        data: postsData,
        filter: (item, q) => item.content.toLowerCase().includes(q),
    },
    '/people': {
        data: usersData,
        filter: (item, q) =>
            [item.userName, item.userSurName, item.userNick]
                .some(field => field?.toLowerCase().includes(q)),
    },
}

export function useSearch() {
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const query = searchParams.get('q') ?? ''
    const normalizedQuery = query.toLowerCase().trim()

    const config = SEARCH_CONFIG[pathname]

    const results = useMemo(() => {
        if (!config) return []
        if (!normalizedQuery) return config.data
        return config.data.filter(item => config.filter(item, normalizedQuery))
    }, [config, normalizedQuery])

    return {
        results,
        query,
        isSearching: normalizedQuery !== '',
    }
}