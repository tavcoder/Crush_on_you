/*IconButton.jsx*/
import './IconButton.css'

export function IconButton({ icon, children, ariaLabel, onClick, variant = "icon-text", direction = "column", badge = false, active = false }) {
    const classes = [
        'btn-reset',
        'btn-icon',
        variant === 'icon' ? 'btn-icon--noText' : variant === 'ghost' ? 'btn-icon--noText btn-icon--ghost' : '',
        direction === 'column' ? 'btn-icon--column' : '',
        active ? 'btn-icon--active' : '',
    ].filter(Boolean).join(' ');

    if (variant === "icon" && !ariaLabel) {
        console.warn('IconButton: ariaLabel es obligatorio cuando variant="icon" (no hay texto visible)');
    }

    return (
        <button className={classes}
            type='button'
            aria-label={ariaLabel}
            onClick={onClick}>
            <span className='btn-icon__icon'>{icon}</span>
            {variant === "icon-text" && (<span className='btn-icon__text'>{children}</span>)}
            {badge && <div className='btn-icon__badge'></div>}
        </button>
    )


}
