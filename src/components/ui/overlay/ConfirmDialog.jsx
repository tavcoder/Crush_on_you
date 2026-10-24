import { useId, useRef } from 'react'
import { Modal } from './Modal.jsx'
import { Button } from '../button/Button.jsx'
import './ConfirmDialog.css'

export function ConfirmDialog({
    isOpen, title, message,
    confirmLabel = 'Confirm', cancelLabel = 'Cancel',
    onConfirm, onCancel, triggerRef, isConfirmDisabled = false,
}) {
    const cancelButtonRef = useRef(null)
    const messageId = useId()

    const handleCancel = () => {
        onCancel()
        triggerRef.current?.focus()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCancel}
            triggerRef={triggerRef}
            title={title}
            describedBy={messageId}
            initialFocusRef={cancelButtonRef}
        >
            <p id={messageId} className="confirm-dialog__message">{message}</p>
            <div className="confirm-dialog__actions">
                <Button ref={cancelButtonRef} type="button" variant="primary" onClick={handleCancel}>
                    {cancelLabel}
                </Button>
                <Button type="button" variant="secondary" onClick={onConfirm} disabled={isConfirmDisabled}>
                    {confirmLabel}
                </Button>
            </div>
        </Modal>
    )
}