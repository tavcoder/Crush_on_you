/*IconButton.jsx*/
import './IconButton.css'

export function IconButton({ icon, children, ariaLabel, ariaPressed, onClick, variant = "icon-text", direction = "column", badge = false, active = false }) {

    const VARIANT_CLASSES = {
        'icon': 'btn-icon--noText',
        'ghost': 'btn-icon--noText btn-icon--ghost',
        'outlined': 'btn-icon--noText btn-icon--outlined',
        'icon-text': '',
    };

    const classes = [
        'btn-reset',
        'btn-icon',
        VARIANT_CLASSES[variant] ?? '',
        direction === 'column' && 'btn-icon--column',
        active && 'btn-icon--active',
    ].filter(Boolean).join(' ');

    const noVisibleText = variant === "icon" || variant === "ghost"
    if (noVisibleText && !ariaLabel) {
        console.warn(`IconButton: ariaLabel es obligatorio con variant="${variant}"`)
    }

    return (
        <button className={classes}
            type='button'
            aria-label={ariaLabel}
            aria-pressed={ariaPressed ?? (active !== undefined ? active : undefined)}
            onClick={onClick}>
            <span className='btn-icon__icon'>{icon}</span>
            {variant === "icon-text" && (<span className='btn-icon__text'>{children}</span>)}
            {badge && <div className='btn-icon__badge'></div>}
        </button>
    )


}
