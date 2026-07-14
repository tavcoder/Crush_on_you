// hooks/useSearch.js
import { useSearchUsers } from '../hooks/useUsers'
import { useSearchPosts } from '../hooks/usePosts'
import { useSearchQuery } from '../hooks/useSearchQuery'


/**
 * Hook orquestador de búsqueda
 * @param {'posts' | 'users'} type - Tipo de entidad a buscar
 */
// DECISIÓN DE DISEÑO: ambos hooks se inicializan siempre,
// aunque solo uno esté habilitado en cada momento.
// TanStack Query evita las peticiones con `enabled: false`,
// pero los hooks ocupan slot en el árbol de React.
// Aceptable con 2 tipos (posts/users). Si se añaden más tipos
// (tags, locations, etc.), considerar lazy initialization o
// un hook genérico parametrizado.

export function useSearch(type = 'posts') {
    const { query, setQuery, clearQuery } = useSearchQuery()
    const isActive = query.trim().length >= 2

    const postsQuery = useSearchPosts(query, {
        enabled: isActive && type === 'posts'
    })
    const usersQuery = useSearchUsers(query, {
        enabled: isActive && type === 'users'
    })

    const activeQuery = type === 'users' ? usersQuery : postsQuery

    return {
        results: activeQuery[type] ?? [],
        isLoading: activeQuery.isLoading,
        isError: activeQuery.isError,
        query,
        isSearching: isActive,
    }
}