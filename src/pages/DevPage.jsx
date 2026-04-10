// pages/DevPage.jsx
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { PostCard } from "../components/organisms/postCard/PostCard.jsx"
import { UserInfo } from "../components/molecules/userInfo/UserInfo.jsx"
import { PostMedia } from "../components/molecules/postMedia/PostMedia.jsx"
import { PostStats } from "../components/molecules/postStats/PostStats.jsx"
import { IconButton } from "../components/ui/iconButton/IconButton.jsx"
import { RoundButton } from "../components/ui/roundButton/RoundButton.jsx"
import { usePosts } from "../hooks/usePosts.js"


export function DevPage() {

    const { posts, isLoading, hasMore, loadMore } = usePosts();
    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           
            <PostFeed
                posts={posts}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />
        </div>


    )
}