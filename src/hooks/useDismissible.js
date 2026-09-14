// hooks/useDismissible.js
import { useEffect, useCallback} from 'react'
export function useDismissible({ isOpen, onClose, triggerRef, contentRef }) {

    const dismiss = useCallback(() => {
        onClose();
        triggerRef.current?.focus();
    }, [onClose, triggerRef]);

    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e) {
            if (
                !contentRef.current?.contains(e.target) &&
                !triggerRef.current?.contains(e.target)
            ) {
                dismiss();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, dismiss, contentRef, triggerRef]);

    useEffect(() => {
        if (!isOpen) return;
        function handleEscape(e) {
            if (e.key === 'Escape') {
                dismiss();
            }
        }
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, dismiss]);
    return { dismiss };
}