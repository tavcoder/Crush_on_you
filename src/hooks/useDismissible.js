// hooks/useDismissible.js
import { useEffect } from 'react'
export function useDismissible({ isOpen, onClose, triggerRef, contentRef }) {
    useEffect(() => {
        if (!isOpen) return;
        function handleClickOutside(e) {
            if (
                !contentRef.current?.contains(e.target) &&
                !triggerRef.current?.contains(e.target)
            ) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, contentRef, triggerRef]);

    useEffect(() => {
        if (!isOpen) return;
        function handleEscape(e) {
            if (e.key === 'Escape') {
                onClose();
                triggerRef.current?.focus();
            }
        }
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, triggerRef]);
}