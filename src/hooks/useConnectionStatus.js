// hooks/useConnectionStatus.js
import { useCallback, useSyncExternalStore } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useIsOnline } from './useIsOnline.js'

/** @returns {'offline' | 'server' | 'ok'} */
export function useConnectionStatus() {
    const isOnline = useIsOnline()
    const cache = useQueryClient().getQueryCache()

    const subscribe = useCallback((cb) => cache.subscribe(cb), [cache])
    const hasServerError = useSyncExternalStore(
        subscribe,
        () => cache.findAll({ type: 'active' })
            .some(q => q.state.status === 'error' && q.state.error?.code === 'SERVER'),
        () => false
    )

    if (!isOnline) return 'offline'
    return hasServerError ? 'server' : 'ok'
}