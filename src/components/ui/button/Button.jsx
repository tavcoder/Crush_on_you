/*Button.jsx*/
import { forwardRef } from 'react'
import './Button.css'

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {() => void} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type]
 * @param {'primary' | 'secondary' | 'ghost'} [props.variant]
 * @param {boolean} [props.disabled]
 * @param {string} [props.ariaLabel]
 * @param {string} [props.className]
 */
export const Button = forwardRef(function Button(
    { children, onClick, type = "button", variant = "primary", disabled = false, ariaLabel, className = '' },
    ref
) {
    const classes = ['btn-reset', `btn--${variant}`, className].filter(Boolean).join(' ')

    return (
        <button
            ref={ref}
            className={classes}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    )
})