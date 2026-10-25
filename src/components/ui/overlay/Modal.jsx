// components/ui/overlay/Modal.jsx
import { useEffect, useId, useRef } from 'react'
import { CloseButton } from '../closeButton/CloseButton.jsx'
import { useDismissible } from '../../../hooks/useDismissible.js'
import './Modal.css'

const FOCUSABLE =
    'button:not([disabled]), [href], input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function Modal({
    isOpen,
    onClose,
    triggerRef,
    title,
    describedBy,
    initialFocusRef,
    closeOnOutsideClick = true,
    className = '',
    children,
    showCloseButton = true,
}) {
    const dialogRef = useRef(null)
    const titleId = useId()

    const { dismiss } = useDismissible({ isOpen, onClose, triggerRef, contentRef: dialogRef, closeOnOutsideClick })

    // Foco inicial: el elemento indicado, o el diálogo mismo
    useEffect(() => {
        if (!isOpen) return
        // Si un hijo ya tiene el foco (autoFocus), se respeta
        if (dialogRef.current?.contains(document.activeElement)) return
        const target = initialFocusRef?.current ?? dialogRef.current
        target?.focus()
    }, [isOpen, initialFocusRef])

    // Focus trap
    useEffect(() => {
        if (!isOpen) return

        function handleTabKey(e) {
            if (e.key !== 'Tab') return
            const items = dialogRef.current?.querySelectorAll(FOCUSABLE)
            if (!items || items.length === 0) return

            const first = items[0]
            const last = items[items.length - 1]

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
            }
        }

        document.addEventListener('keydown', handleTabKey)
        return () => document.removeEventListener('keydown', handleTabKey)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="modal__backdrop">
            <div
                ref={dialogRef}
                className={`card modal ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={describedBy}
                tabIndex={-1}
            >
                <div className="modal__header">
                    <h2 id={titleId} className="modal__title">{title}</h2>
                    {showCloseButton && <CloseButton onClick={dismiss} ariaLabel="Close dialog" />}
                </div>
                {children}
            </div>
        </div>
    )
}