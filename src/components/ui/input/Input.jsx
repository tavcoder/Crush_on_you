/*Input.jsx*/
import { Search } from "lucide-react";
import './Input.css'


export function Input({
    label,
    value,
    onChange,
    variant = "",
    type = 'text',
    placeholder,
    id,              // ← for htmlFor
    name,            // ← for forms
    className,            // ← for forms
    disabled = false
}) {
    const rootClass = [
        'input',
        disabled && 'input--disabled',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={rootClass}>
            {variant === "icon" && <Search className="input__icon" aria-hidden="true" />}
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
                className="input__field"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? label}
                disabled={disabled}
            />
        </div>
    )
}