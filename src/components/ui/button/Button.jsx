import './Button.css'

export function Button({ children, onClick, type = "button", variant = "primary", disabled = false, ariaLabel, className}) {
    return (
        <button
            className={`btn-reset btn--${variant} ${className}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel} 
        >
            {children}
        </button>
    )
}