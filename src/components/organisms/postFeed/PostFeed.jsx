// PostFeed.jsx
import { useContext } from 'react';
import { PostCard } from '../postCard/PostCard.jsx';
import { PostCardSkeleton } from '../postCard/PostCardSkeleton.jsx';
import { PostFeedSkeleton } from './PostFeedSkeleton.jsx';
import { EmptyState } from '../../ui/feedback/EmptyState.jsx';
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx';
import { UserAuthContext } from "../../../context/UserAuthContext.jsx"
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.js';
import './PostFeed.css';

export function PostFeed({ posts, query, isInitialLoading, isLoadingNextPage, emptyMessage, canLoadMore, onLoadMore, error }) {
    const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: canLoadMore });
    const { currentUser } = useContext(UserAuthContext);
    // Estados de carga y vacío
    const postCount = posts?.length ?? 0;

    const isEmpty = !isInitialLoading && postCount === 0;
    const hasPosts = postCount > 0;
    if (error) return <ErrorFallback error={error} />
    return (
        <section
            aria-live="polite"
            aria-busy={isInitialLoading || isLoadingNextPage}
            aria-label="Post feed"
            className="post-feed-container"
        >
            {isInitialLoading && <PostFeedSkeleton count={3} />}

            {/* Estado vacío */}
            {isEmpty && (
                <EmptyState content={emptyMessage} />
            )}

            {hasPosts && (
                <ul className="post-feed" role="list">

                    {posts.map(post => (
                        <li key={post.id} className="post-feed__item">
                            <PostCard
                                post={post}
                                isCurrentUser={post.authorId === currentUser?.id}
                                query={query}
                            />
                        </li>
                    ))}

                    <li
                        ref={sentinelRef}
                        className="post-feed__sentinel"
                        aria-hidden="true"
                    />

                    {isLoadingNextPage && (
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