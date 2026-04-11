//postFeed/PostFeed.jsx
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.js';
import { useCurrentUser } from '../../../hooks/useCurrentUser.js'
import { PostCard } from '../postCard/PostCard.jsx';
import { PostCardSkeleton } from '../postCard/PostCardSkeleton.jsx';
import { PostFeedSkeleton } from './PostFeedSkeleton.jsx';
import { EmptyState } from '../../ui/feedback/EmptyState.jsx';
import './PostFeed.css';

export function PostFeed({ posts, isLoading, hasMore, onLoadMore }) {
    const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: hasMore });
    const { currentUser } = useCurrentUser();

    return (
        
        <section aria-live="polite" aria-busy={isLoading} aria-label="Post feed">

            {isLoading && !posts?.length && <PostFeedSkeleton count={3} />}

            {!isLoading && !posts?.length && (
                <EmptyState content="No posts yet. Be the first to share something!" />
            )}

            {posts?.length > 0 && (
                <ul className='post-feed'>
                    {posts.map(post => (
                        <li key={post.id}>
                            <PostCard
                                post={post}
                                isCurrentUser={post.authorId === currentUser?.id}
                            />
                        </li>
                    ))}
                    <li ref={sentinelRef} className='post-feed__sentinel' aria-hidden="true" />
                    {isLoading && (
                        <li className='post-feed__loading'>
                            <PostCardSkeleton />
                        </li>
                    )}
                </ul>
            )}

        </section>
    );
}