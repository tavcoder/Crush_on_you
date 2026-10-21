// PostFeed.jsx
import { useContext } from 'react';
import { PostCard } from '../postCard/PostCard.jsx';
import { PostCardSkeleton } from '../postCard/PostCardSkeleton.jsx';
import { PostFeedSkeleton } from './PostFeedSkeleton.jsx';
import { EmptyState } from '../../ui/feedback/EmptyState.jsx';
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx';
import { Button } from '../../ui/button/Button.jsx';
import { UserAuthContext } from "../../../context/UserAuthContext.jsx"
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll.js';
import './PostFeed.css';

export function PostFeed({ posts, query, isInitialLoading, isLoadingNextPage, isLoaded, isLoadMoreError, emptyMessage, canLoadMore, onLoadMore, error, onRetry }) {
    const sentinelRef = useInfiniteScroll(onLoadMore, { enabled: canLoadMore });
    const { currentUser } = useContext(UserAuthContext);
    // Estados de carga y vacío
    const postCount = posts?.length ?? 0;

    const hasPosts = postCount > 0;
    const showError = Boolean(error) && !hasPosts;          // sin datos y con error
    const isEmpty = isLoaded && !hasPosts;

    if (showError) return <ErrorFallback error={error} onRetry={onRetry} />

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
                    {isLoadMoreError && (
                        <li className="post-feed__load-error">
                            <p>Couldn't load more posts.</p>
                            <Button type="button" variant="secondary" onClick={onLoadMore}>
                                Try again
                            </Button>
                        </li>
                    )}
                </ul>
            )
            }
        </section >
    );
}