// PostFeedSkeleton.jsx
import { PostCardSkeleton } from './PostCardSkeleton';
import './PostFeedSkeleton.css';

export function PostFeedSkeleton({ count = 3 }) {
    return (
        <ul className="post-feed-skeleton" aria-busy="true" aria-label="Loading posts">
            {Array.from({ length: count }, (_, index) => (
                <li key={index}>
                    <PostCardSkeleton />
                </li>
            ))}
        </ul>
    );
}