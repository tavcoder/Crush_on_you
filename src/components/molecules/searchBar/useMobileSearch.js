// components/molecules/searchBar/useMobileSearch.js
import { useCallback, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import { useSearchQuery } from '../../../hooks/useSearchQuery.js'

export function useMobileSearch() {
    const { pathname } = useLocation()
    const { clearQuery } = useSearchQuery()
    const [isOpen, setIsOpen] = useState(false)
    const [prevPathname, setPrevPathname] = useState(pathname)
    const triggerRef = useRef(null) // el botón Search del BottomNav

    // Al cambiar de página se cierra (sin devolver el foco: el usuario navegó)
    if (pathname !== prevPathname) {
        setPrevPathname(pathname)
        setIsOpen(false)
    }

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => {
        setIsOpen(false)
        clearQuery()
    }, [clearQuery])
    const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close])

    // Para Escape: cierra y devuelve el foco al botón que lo abrió
    const closeAndRestoreFocus = useCallback(() => {
        console.log('closeAndRestoreFocus', triggerRef.current)
        close()
        triggerRef.current?.focus()
    }, [close])

    return { isOpen, toggle, close, closeAndRestoreFocus, triggerRef }
}