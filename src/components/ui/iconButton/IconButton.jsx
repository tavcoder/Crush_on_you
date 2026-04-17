import './IconButton.css';

export function IconButton({
    icon,
    children,
    ariaLabel,
    onClick,
    variant = 'icon-text',
    direction = 'column',
    badge = false,
    isPressed,
    textVisibility = 'visible', // visible | responsive-hidden | sr-only
    type = 'button',
    className = '',
}) {
    const isIconOnly = !children;
    const needsAriaLabel = isIconOnly && !ariaLabel;

    if (needsAriaLabel) {
        console.warn('IconButton: ariaLabel es obligatorio cuando no hay texto visible');
    }

    const classes = [
        'btn-reset',
        'btn-icon',
        `btn-icon--${variant}`,
        direction === 'column' && 'btn-icon--column',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            aria-label={isIconOnly ? ariaLabel : undefined}
            aria-pressed={typeof isPressed === 'boolean' ? isPressed : undefined}
        >
            <span className="btn-icon__icon" aria-hidden="true">{icon}</span>

            {children && (
                <span
                    className={`btn-icon__text ${textVisibility === "sr-only"
                            ? "sr-only"
                            : `btn-icon__text--${textVisibility}`
                        }`}
                >
                    {children}
                </span>
            )}

            {badge && <span className="btn-icon__badge" aria-hidden="true" />}
        </button>
    );
}