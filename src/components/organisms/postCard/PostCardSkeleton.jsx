// PostCardSkeleton.jsx
import { SkeletonBase } from '../../ui/skeletons/SkeletonBase';
import './PostCard.css';

export function PostCardSkeleton() {
    return (
        <article className='card post-card' aria-busy="true" aria-label="Loading post">
            {/* Header: Avatar + Username + Date */}
            <div className="user-info">
                <SkeletonBase variant="avatar" />
                <div className="user-info__text">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <SkeletonBase variant="title" width="120px" />
                        <SkeletonBase variant="text" width="80px" />
                    </div>
                </div>
            </div>

            {/* Image */}
            <SkeletonBase variant="image" className='post-media' />

            {/* Content: Text */}
            <div className='post-card__content'>
                <SkeletonBase variant="text" />
                <SkeletonBase variant="text" width="90%" />
                <SkeletonBase variant="text" width="40%" />
            </div>

            {/* Actions: Like, Comment, Share */}
            <div className='post-stats'>
                <div className='post-stats__counters'>
                    <SkeletonBase variant="text" width="48px" />
                    <SkeletonBase variant="text" width="48px" />
                    <SkeletonBase variant="text" width="48px" />
                </div>
                <SkeletonBase variant="circle" width="32px" height="32px" />
            </div>
        </article>
    );
}