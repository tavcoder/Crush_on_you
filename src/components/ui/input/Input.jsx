/*Input.jsx*/
import { Search } from "lucide-react";
import './Input.css'


export function Input({
    label,
    value,
    onChange,
    variant = "icon",
    placeholder,
    id,              // ← necesario para htmlFor
    name,            // ← necesario para forms
    className,            // ← necesario para forms
    disabled = false
}) {
    return (
        <div className={`input ${disabled ? 'input--disabled' : ''} ${className}`}>
            {variant === "icon" && <Search className="input__icon" aria-hidden="true" />}
            <label htmlFor={id} className="sr-only">{label}</label>
            <input
                className="input__field"
                type="text"
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