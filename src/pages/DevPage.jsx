// pages/DevPage.jsx
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { useCurrentUser } from '../hooks/useCurrentUser.js'
import { usePosts } from "../hooks/usePosts.js"
import { useFollowingList } from "../hooks/useFollowingList.js"


export function DevPage() {
    const { currentUser } = useCurrentUser();
    const { posts, isLoading, hasMore, loadMore } = usePosts();
    const { users, handleStorySeen } = useFollowingList();

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <StoriesBar
                currentUser={currentUser}
                users={users}
                onStorySeen={handleStorySeen}
            />

            <PostFeed
                posts={posts}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />
        </div>
    )
}