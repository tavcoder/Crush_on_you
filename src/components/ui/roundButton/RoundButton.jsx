/*RoundButton.jsx*/

import './RoundButton.css'

export function RoundButton({ buttonText = "+", ariaLabel, className, buttonSize = "sm", onClick }) {
    return (
        <button
            aria-label={ariaLabel}
            className={`btn--round btn--round--${buttonSize}${className ? ` ${className}` : ''}`}
            type='button'
            onClick={onClick}>
            <span aria-hidden="true">{buttonText}</span>
        </button>
    )
}
