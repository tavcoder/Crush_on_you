// hooks/useRetryAll.js
import { useQueryClient } from '@tanstack/react-query'

export function useRetryAll() {
    const queryClient = useQueryClient()
    return () => queryClient.refetchQueries({
        type: 'active',
        predicate: (query) => query.state.status === 'error',
    })
}