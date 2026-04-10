// SkeletonBase.jsx
import './SkeletonBase.css';

export function SkeletonBase({
    variant = 'text', // 'text' | 'title' | 'avatar' | 'image' | 'circle'
    width,
    height,
    className = ''
}) {
    const style = {
        width: width || undefined,
        height: height || undefined,
    };

    return (
        <div
            className={`skeleton skeleton--${variant} skeleton--animated ${className}`}
            style={style}
            aria-hidden="true"
        />
    );
}