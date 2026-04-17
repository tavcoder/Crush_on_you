// PostFeed.jsx
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.js';
import { useCurrentUser } from '../../../hooks/useCurrentUser.js';
import { PostCard } from '../postCard/PostCard.jsx';
import { PostCardSkeleton } from '../postCard/PostCardSkeleton.jsx';
import { PostFeedSkeleton } from './PostFeedSkeleton.jsx';
import { EmptyState } from '../../ui/feedback/EmptyState.jsx';
import './PostFeed.css';

export function PostFeed({ posts, isLoading, hasMore, onLoadMore}) {
    const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: hasMore });
    const { currentUser } = useCurrentUser();

    // Estados de carga y vacío
    const isInitialLoading = isLoading && !posts?.length;
    const isEmpty = !isLoading && !posts?.length;
    const hasPosts = posts?.length > 0;

    return (
        <section
            aria-live="polite"
            aria-busy={isLoading}
            aria-label="Post feed"
            className="post-feed-container"
        >
            {isInitialLoading && <PostFeedSkeleton count={3} />}

            {/* Estado vacío */}
            {isEmpty && (
                <EmptyState content="No posts yet. Be the first to share something!" />
            )}

            {hasPosts && (
                <ul className="post-feed" role="list">
                    {posts.map(post => (
                        <li key={post.id} className="post-feed__item">
                            <PostCard
                                post={post}
                                isCurrentUser={post.authorId === currentUser?.id}
                            />
                        </li>
                    ))}

                    <li
                        ref={sentinelRef}
                        className="post-feed__sentinel"
                        aria-hidden="true"
                    />

                    {isLoading && (
                        <li className="post-feed__loading">
                            <PostCardSkeleton />
                            <span className="sr-only">Loading more posts</span>
                        </li>
                    )}
                </ul>
            )
            }
        </section >
    );
}