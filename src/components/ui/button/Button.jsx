import './Button.css'

export function Button({ children, onClick, type = "button", variant = "primary", disabled = false, ariaLabel }) {
    return (
        <button
            className={`btn-reset btn--${variant}`}
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel} 
        >
            {children}
        </button>
    )
}