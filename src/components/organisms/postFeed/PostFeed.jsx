//postFeed/PostFeed.jsx
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.js';
import { PostCard } from '../postCard/PostCard.jsx';
import { PostCardSkeleton } from '../../ui/skeletons/PostCardSkeleton.jsx';
import { PostFeedSkeleton } from '../../ui/skeletons/PostFeedSkeleton.jsx';
import { EmptyState } from '../../ui/feedback/EmptyState.jsx';
import './PostFeed.css';

export function PostFeed({ posts, isLoading, hasMore, onLoadMore }) {
    const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: hasMore });

    // 🎯 CARGA INICIAL: Mostrar skeletons
    if (isLoading && !posts?.length) {
        return <PostFeedSkeleton count={3} />;
    }

    // Estado vacío (ya no hay loading aquí)
    if (!posts?.length) {
        return <EmptyState content="No posts yet. Be the first to share something!" />;
    }

    return (
        <ul className='post-feed'>
            {posts.map(post => (
                <li key={post.id}>
                    <PostCard post={post} />
                </li>
            ))}

            <li ref={sentinelRef} className='post-feed__sentinel' aria-hidden="true" />

            {/* Carga incremental: spinner simple o skeleton individual */}
            {isLoading && (
                <li className='post-feed__loading'>
                    <PostCardSkeleton /> {/* Opción: skeleton en lugar de spinner */}
                </li>
            )}
        </ul>
    );
}