/*IconButton.jsx*/
import './IconButton.css'

export function IconButton({ icon, children, ariaLabel, ariaPressed, onClick, variant = "icon-text", direction = "column", badge = false, active = false }) {
    const classes = [
        'btn-reset',
        'btn-icon',
        variant === 'icon' ? 'btn-icon--noText' : variant === 'ghost' ? 'btn-icon--noText btn-icon--ghost' : variant === 'outlined' ? 'btn-icon--noText btn-icon--outlined' : '',
        direction === 'column' ? 'btn-icon--column' : '',
        active ? 'btn-icon--active' : '',
    ].filter(Boolean).join(' ');

    const noVisibleText = variant === "icon" || variant === "ghost"
    if (noVisibleText && !ariaLabel) {
        console.warn(`IconButton: ariaLabel es obligatorio con variant="${variant}"`)
    }

    return (
        <button className={classes}
            type='button'
            aria-label={ariaLabel}
            aria-pressed={ariaPressed}
            onClick={onClick}>
            <span className='btn-icon__icon'>{icon}</span>
            {variant === "icon-text" && (<span className='btn-icon__text'>{children}</span>)}
            {badge && <div className='btn-icon__badge'></div>}
        </button>
    )


}
