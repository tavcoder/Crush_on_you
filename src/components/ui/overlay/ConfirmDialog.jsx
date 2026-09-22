import { useEffect, useRef } from 'react'
import { useDismissible } from '../../../hooks/useDismissible.js'
import { Button } from '../button/Button.jsx'
import './ConfirmDialog.css'

export function ConfirmDialog({
    isOpen,
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    triggerRef,
}) {
    const dialogRef = useRef(null)
    const cancelButtonRef = useRef(null)

    const { dismiss } = useDismissible({
        isOpen,
        onClose: onCancel,
        triggerRef,
        contentRef: dialogRef,
    })

    // Foco inicial: al abrir, foco en Cancel (opción segura por defecto)
    useEffect(() => {
        if (isOpen) {
            cancelButtonRef.current?.focus()
        }
    }, [isOpen])

    // Focus trap: Tab/Shift+Tab ciclan solo dentro del diálogo
    useEffect(() => {
        if (!isOpen) return

        function handleTabKey(e) {
            if (e.key !== 'Tab') return

            const focusableElements = dialogRef.current?.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
            if (!focusableElements || focusableElements.length === 0) return

            const firstElement = focusableElements[0]
            const lastElement = focusableElements[focusableElements.length - 1]

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement.focus()
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()
            }
        }

        document.addEventListener('keydown', handleTabKey)
        return () => document.removeEventListener('keydown', handleTabKey)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div className="confirm-dialog__backdrop ">
            <div
                ref={dialogRef}
                className="card confirm-dialog card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-message"
            >
                <h2 id="confirm-dialog-title" className="confirm-dialog__title">
                    {title}
                </h2>
                <p id="confirm-dialog-message" className="confirm-dialog__message">
                    {message}
                </p>
                <div className="confirm-dialog__actions">
                    <Button
                        ref={cancelButtonRef}
                        type="button"
                        variant="primary"
                        onClick={dismiss}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        type="button"
                        variant={'secondary'}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}