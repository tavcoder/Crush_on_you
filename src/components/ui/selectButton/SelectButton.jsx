import { useState } from 'react'
import { ChevronDown } from "lucide-react";
import './SelectButton.css'

export function SelectButton({ label, name, options = [], onChange, disabled = false, className = "" }) {
    const [value, setValue] = useState(options[0]?.value ?? "");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange?.(name, newValue);
    };

    const activeIcon = options.find(o => o.value === value)?.icon;

    return (
        <div className={`btn-reset select-button ${className}`} >
            {activeIcon && (
                <span className='select-button__icon'>{activeIcon}</span>
            )}
            <p className='select-button__label'>{label}</p>

            <select
                className='select-button__select '
                value={value}
                disabled={disabled}
                onChange={handleChange}
                name={label}
                aria-label={label}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown
                size={14}
                className='select-button__chevron'
                aria-hidden="true"
            />
        </div>
    )
}