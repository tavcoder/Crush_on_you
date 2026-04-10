// PostCardSkeleton.jsx
import { SkeletonBase } from './SkeletonBase';
import './PostCardSkeleton.css';

export function PostCardSkeleton() {
    return (
        <article className="post-card-skeleton" aria-busy="true" aria-label="Loading post">
            {/* Header: Avatar + Username + Date */}
            <div className="post-card-skeleton__header">
                <SkeletonBase variant="avatar" />
                <div className="post-card-skeleton__meta">
                    <SkeletonBase variant="title" width="120px" />
                    <SkeletonBase variant="text" width="80px" style={{ marginTop: '0.5rem' }} />
                </div>
            </div>

            {/* Content: Text */}
            <div className="post-card-skeleton__content">
                <SkeletonBase variant="text" />
                <SkeletonBase variant="text" width="90%" />
                <SkeletonBase variant="text" width="40%" />
            </div>

            {/* Image (opcional en posts reales, pero mostramos placeholder) */}
            <SkeletonBase variant="image" className="post-card-skeleton__image" />

            {/* Actions: Like, Comment, Share */}
            <div className="post-card-skeleton__actions">
                <SkeletonBase variant="text" width="60px" />
                <SkeletonBase variant="text" width="60px" />
                <SkeletonBase variant="text" width="60px" />
            </div>
        </article>
    );
}