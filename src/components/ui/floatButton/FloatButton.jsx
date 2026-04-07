/*FloatButton.jsx*/
import './FloatButton.css'

export function FloatButton({ onClick, disabled }) {
    return (
        <button
            type='button'
            className='btn-reset btn-float'
            onClick={onClick}
            aria-label='Create New Post'
            disabled={disabled}>
            <span aria-hidden="true">+</span>
        </button>
    )
}