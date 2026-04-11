// PostFeedSkeleton.jsx
import { PostCardSkeleton } from '../postCard/PostCardSkeleton';
import './PostFeed.css';

export function PostFeedSkeleton({ count = 3 }) {
    return (
        <ul className='post-feed' aria-busy="true" aria-label="Loading posts">
            {Array.from({ length: count }, (_, index) => (
                <li key={index}>
                    <PostCardSkeleton />
                </li>
            ))}
        </ul>
    );
}