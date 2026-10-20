// hooks/useIsOnline.js
import { useSyncExternalStore } from 'react'

const subscribe = (callback) => {
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
    }
}

export function useIsOnline() {
    return useSyncExternalStore(subscribe, () => navigator.onLine, () => true)
}