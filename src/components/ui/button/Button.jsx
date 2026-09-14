/*Button.jsx*/
import { forwardRef } from 'react'
import './Button.css'

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {string} [props.ariaLabel]
 * @param {string} [props.className]
 */

export const Button = forwardRef(function Button(
    { children, onClick, type = "button", variant = "primary", disabled = false, ariaLabel, className },
    ref
) {
    return (
        <button
            ref={ref}
            className={`btn-reset btn--${variant} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
})