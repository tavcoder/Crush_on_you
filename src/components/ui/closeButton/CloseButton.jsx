// components/ui/closeButton/CloseButton.jsx
import { X } from 'lucide-react'
import './CloseButton.css'

export function CloseButton({ onClick, ariaLabel = 'Close', disabled = false, className = '' }) {
    return (
        <button
            type="button"
            className={`btn-reset close-button ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            <X aria-hidden="true" />
        </button>
    )
}