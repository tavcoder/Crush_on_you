import { useState, useRef, useCallback, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import { useDismissible } from '../../../hooks/useDismissible.js'
import { ConfirmDialog } from '../../ui/overlay/ConfirmDialog.jsx'
import { useDeletePost } from '../../../hooks/usePosts.js'
import './PostOptionsMenu.css'

// TODO: [DEUDA TÉCNICA] Duplica el patrón de dropdown de AvatarMenu
// (useDismissible, focus management, navegación con flechas). Con un
// único ítem hoy no se justifica extraer un DropdownMenu genérico —
// se extraerá cuando exista un tercer caso de uso real (ej. opciones
// de comentario), siguiendo la regla de tres antes de abstraer.

export function PostOptionsMenu({ postId }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const close = useCallback(() => setIsOpen(false), [])

    const { mutate: deletePost, isPending: isDeleting, isError, error } = useDeletePost()

    useEffect(() => {
        if (!isOpen) return
        const firstMenuItem = menuRef.current?.querySelector('[role="menuitem"]')
        firstMenuItem?.focus()
    }, [isOpen])

    const handleDeleteClick = () => {
        close()
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        deletePost(postId, {
            onSuccess: () => setIsConfirmOpen(false),
        })
    }

    const handleCancelDelete = () => {
        setIsConfirmOpen(false)
    }

    const handleMenuKeyDown = (event) => {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
        event.preventDefault()
        const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')]
        const currentIndex = items.indexOf(document.activeElement)
        const nextIndex = event.key === 'ArrowDown'
            ? (currentIndex + 1) % items.length
            : (currentIndex - 1 + items.length) % items.length
        items[nextIndex].focus()
    }

    useDismissible({
        isOpen,
        onClose: close,
        triggerRef: buttonRef,
        contentRef: menuRef,
    })

    return (
        <div className='post-options-menu'>
            <button
                ref={buttonRef}
                className="btn-reset post-options-menu__trigger"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label="Post options"
            >
                <MoreHorizontal aria-hidden="true" />
            </button>

            {isOpen && (
                <ul
                    ref={menuRef}
                    className="card post-options-menu__dropdown"
                    role="menu"
                    onKeyDown={handleMenuKeyDown}
                >
                    <li role="none">
                        <button
                            role="menuitem"
                            className="btn-reset post-options-menu__item post-options-menu__item--danger"
                            onClick={handleDeleteClick}
                        >
                            Delete post
                        </button>
                    </li>
                </ul>
            )}

            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Delete post"
                message="This post will be permanently deleted. This can't be undone."
                confirmLabel={isDeleting ? "Deleting..." : "Delete"}
                cancelLabel="Cancel"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                triggerRef={buttonRef}
                isConfirmDisabled={isDeleting}
            />

            {isError && (
                <p role="alert" className="post-options-menu__error">
                    {error?.message ?? "Couldn't delete the post. Please try again."}
                </p>
            )}
        </div>
    )
}