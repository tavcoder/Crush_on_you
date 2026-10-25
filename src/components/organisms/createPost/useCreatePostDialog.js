// useCreatePostDialog.js
import { useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreatePost } from '../../../hooks/usePosts.js'

/**
 * Orquesta el diálogo de crear post: estado abierto/cerrado, ref del botón
 * que lo abre (para devolverle el foco) y qué pasa al publicar con éxito
 * (cerrar, devolver el foco y llevar al feed).
 *
 * @returns {{
 *   isOpen: boolean,
 *   open: () => void,
 *   close: () => void,
 *   triggerRef: import('react').RefObject<HTMLButtonElement>,
 *   onPostCreated: (data: object, opts?: { onSuccess?: Function, onError?: Function }) => void,
 *   isSubmitting: boolean,
 * }}
 */
export function useCreatePostDialog() {
    const { addPost, isAddingPost } = useCreatePost()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const triggerRef = useRef(null)

    const open = useCallback(() => setIsOpen(true), [])
    const close = useCallback(() => setIsOpen(false), [])

    // Conserva los callbacks que CreatePost pasa (limpiar el formulario)
    // y añade lo propio del diálogo
    const onPostCreated = useCallback((data, opts) => {
        addPost(data, {
            ...opts,
            onSuccess: (...args) => {
                opts?.onSuccess?.(...args)
                setIsOpen(false)
                triggerRef.current?.focus()
                navigate('/feed')
            },
        })
    }, [addPost, navigate])

    return { isOpen, open, close, triggerRef, onPostCreated, isSubmitting: isAddingPost }
}