import { Link } from 'react-router'
import './IconButton.css';

export function IconButton({
    icon,
    children,
    ariaLabel,
    onClick,
    variant = 'ghost', // ghost | outlined | filled
    direction = 'row', // row | column
    badge = false,
    isPressed,
    textVisibility = 'visible', // visible | responsive-hidden | sr-only
    type = 'button',
    className = '',
    to,
}) {
    const isIconOnly = !children;

    if (isIconOnly && !ariaLabel) {
        console.warn('IconButton: ariaLabel es obligatorio cuando no hay texto');
    }

    const classes = [
        'btn-reset',
        'btn-icon',
        isIconOnly && 'btn-icon--no-text',
        direction === 'column' && 'btn-icon--column',
        variant && `btn-icon--${variant}`,
        isPressed && 'btn-icon--active',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            <span className="btn-icon__icon" aria-hidden="true">
                {icon}
            </span>

            {children && (
                <span
                    className={`btn-icon__text ${textVisibility === 'sr-only'
                        ? 'sr-only'
                        : `btn-icon__text--${textVisibility}`
                        }`}
                >
                    {children}
                </span>
            )}

            {badge && <span className="btn-icon__badge" aria-hidden="true" />}
        </>
    );

    const commonProps = {
        className: classes,
        onClick,
        'aria-label': isIconOnly ? ariaLabel : undefined,
        ...(to
            ? { 'aria-current': isPressed ? 'page' : undefined }
            : { 'aria-pressed': typeof isPressed === 'boolean' ? isPressed : undefined }
        ),
    };

    if (to) {
        return (
            <Link to={to} {...commonProps}>
                {content}
            </Link>
        );
    }

    return (
        <button type={type} {...commonProps}>
            {content}
        </button>
    );
}