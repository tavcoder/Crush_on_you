/*RoundButton.jsx*/

import './RoundButton.css'

export function RoundButton({ showStory = false, className, onClick }) {
    return (
        <button
            aria-label={showStory ? "Add story" : "Follow user"}
            className={`btn--round ${className}`}
            type='button'
            onClick={onClick}>
            <span aria-hidden="true">+</span>
        </button>
    )
}
