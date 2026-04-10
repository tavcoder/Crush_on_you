// pages/DevPage.jsx
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { PostCard } from "../components/organisms/postCard/PostCard.jsx"
import { UserInfo } from "../components/molecules/userInfo/UserInfo.jsx"
import { PostMedia } from "../components/molecules/postMedia/PostMedia.jsx"
import { PostStats } from "../components/molecules/postStats/PostStats.jsx"
import { IconButton } from "../components/ui/iconButton/IconButton.jsx"
import { RoundButton } from "../components/ui/roundButton/RoundButton.jsx"
import { useCurrentUser } from '../hooks/useCurrentUser.js'
import { usePosts } from "../hooks/usePosts.js"
import { usersData } from "../services/mocks/users.mock.js"


export function DevPage() {
    const { currentUser } = useCurrentUser();
    const { posts, isLoading, hasMore, loadMore } = usePosts();

    const currentUserData = usersData.find(
        user => user.id === currentUser
    );

    console.log(currentUserData);

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <StoriesBar
                currentUser={currentUserData}
                users={usersData}

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