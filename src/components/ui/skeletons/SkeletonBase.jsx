// SkeletonBase.jsx
import './SkeletonBase.css';

export function SkeletonBase({
    variant = 'text', // 'text' | 'title' | 'avatar' | 'image' | 'circle'
    avatarSize,// 'sm' | 'md' | 'lg' | 'xl'
    width,
    height,
    className = ''
}) {

    const sizeClass = variant === 'avatar' && avatarSize ? `skeleton--avatar-${avatarSize}` : '';
    const style = {
        width: width || undefined,
        height: height || undefined,
    };

    return (
        <div
            className={`skeleton skeleton--${variant} skeleton--animated ${sizeClass} ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}