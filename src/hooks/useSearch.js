/* hooks/useSearch.js*/
import { useSearchUsers } from './useUsers'
import { useSearchPosts } from './usePosts'
import { useSearchQuery } from './useSearchQuery'


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
    const { query, page, setPage } = useSearchQuery()
    const isActive = query.trim().length >= 2

    const postsQuery = useSearchPosts(query, { enabled: isActive && type === 'posts' })
    const usersQuery = useSearchUsers(query, { enabled: isActive && type === 'users', page })

    const activeQuery = type === 'users' ? usersQuery : postsQuery
    const results = type === 'users' ? usersQuery.users : postsQuery.posts

    // Los posts usan scroll infinito (useInfiniteQuery) y los usuarios paginación
    // por páginas (useQuery + ?page=), coherente con followers y following.
    return {
        results,
        isLoading: activeQuery.isLoading,
        isError: activeQuery.isError,
        error: activeQuery.error,
        hasNextPage: type === 'posts' ? postsQuery.hasNextPage : false,
        fetchNextPage: type === 'posts' ? postsQuery.fetchNextPage : () => { },
        isFetchingNextPage: type === 'posts' ? postsQuery.isFetchingNextPage : false,
        isFetchNextPageError: type === 'posts' ? postsQuery.isFetchNextPageError : false,
        pagination: type === 'users' ? usersQuery.pagination : undefined,
        setPage,
        query,
        isSearching: isActive,
        isSuccess: activeQuery.isSuccess,
    }
}