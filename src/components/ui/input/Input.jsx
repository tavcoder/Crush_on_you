/*Input.jsx*/
import { Search, X } from "lucide-react";
import './Input.css'

export function Input({
    label,
    value,
    onChange,
    onClear,
    onKeyDown,
    variant = "",
    type = 'text',
    placeholder,
    id,
    name,
    className,
    disabled = false,
    ref,
}) {
    const rootClass = [
        'input',
        disabled && 'input--disabled',
        className,
    ].filter(Boolean).join(' ')

    return (
        <div className={rootClass}>
            {variant === "icon" && <Search className="input__icon" aria-hidden="true" />}
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
                ref={ref}
                className="input__field"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder ?? label}
                disabled={disabled}
            />
            {value && onClear && (
                <button
                    type="button"          // ← evita submit del form
                    onClick={onClear}
                    className="btn-reset input__clear"
                    aria-label="Clear search"
                >
                    <X aria-hidden="true" />
                </button>
            )}
        </div>
    )
}