/*RoundButton.jsx*/

import './RoundButton.css'

export function RoundButton({ showStory = false, onClick }) {
    return (
        <button
            aria-label={showStory ? "Añadir historia" : "Seguir usuario"}
            className={`btn--round ${showStory && 'btn--story'}`}
            type='button'
            onClick={onClick}>
            <span aria-hidden="true">+</span>
        </button>
    )
}
