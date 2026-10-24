/*FloatButton.jsx*/
import { forwardRef } from 'react'
import './FloatButton.css'

export const FloatButton = forwardRef(function FloatButton({ onClick, disabled }, ref) {
    return (
        <button
            ref={ref}
            type='button'
            className='btn-reset btn-float'
            onClick={onClick}
            aria-label='Create New Post'
            disabled={disabled}>
            <span aria-hidden="true">+</span>
        </button>
    )
})