/*IconButton.jsx*/
import { useState } from 'react'
import { Link } from 'react-router'
import './IconButton.css';

export function IconButton({
    icon,
    children,
    ariaLabel,
    role,
    ariaChecked,
    onClick,
    variant = 'ghost', // ghost | outlined
    direction = 'row', // row | column
    disabled = false,
    tooltip = undefined,
    badge = false,
    isPressed,
    animateIcon = false,
    textVisibility = 'visible', // visible | responsive-hidden | sr-only
    type = 'button',
    className = '',
    to,
}) {
    const isIconOnly = !children;
    const [isPulsing, setIsPulsing] = useState(false);

    if (isIconOnly && !ariaLabel) {
        console.warn('IconButton: ariaLabel es obligatorio cuando no hay texto');
    }

    const handleClick = (e) => {
        // Solo pulsa al ACTIVAR (like/bookmark), nunca al quitar ni al montar
        if (animateIcon && !isPressed) {
            setIsPulsing(true);
        }
        onClick?.(e);
    };

    const classes = [
        'btn-reset',
        'btn-icon',
        direction === 'column' && 'btn-icon--column',
        variant && `btn-icon--${variant}`,
        isPressed && 'btn-icon--active',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            <span
                className={`btn-icon__icon${isPulsing ? ' btn-icon__icon--pulse' : ''}`}
                aria-hidden="true"
                onAnimationEnd={() => setIsPulsing(false)}
            >
                {icon}
                {badge && <span className="btn-icon__badge" aria-hidden="true" />}
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
        </>
    );

    const commonProps = {
        className: classes,
        onClick: handleClick,
        'aria-label': isIconOnly ? ariaLabel : undefined,
        ...(to
            ? { 'aria-current': isPressed ? 'page' : undefined }
            : { 'aria-pressed': typeof isPressed === 'boolean' && role !== 'checkbox' ? isPressed : undefined }
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
        <div className="tooltip-wrapper" data-tooltip={tooltip}>
            <button disabled={disabled} type={type} role={role} aria-checked={ariaChecked} {...commonProps}>
                {content}
            </button>
        </div>
    );
}