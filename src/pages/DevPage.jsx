// pages/DevPage.jsx
import { Globe, Users } from "lucide-react";
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { CreatePost } from "../components/organisms/createPost/CreatePost.jsx";
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { BottomNav } from "../components/molecules/bottomNav/BottomNav.jsx"
import { SelectButton } from "../components/ui/selectButton/SelectButton.jsx"
import { useCurrentUser } from '../hooks/useCurrentUser.js'
import { usePosts } from "../hooks/usePosts.js"
import { useFollowingList } from "../hooks/useFollowingList.js"


export function DevPage() {
    const { currentUser } = useCurrentUser();
    const { posts, isLoading, hasMore, loadMore, addPost } = usePosts();
    const { users, handleStorySeen } = useFollowingList();

    return (
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <StoriesBar
                currentUser={currentUser}
                users={users}
                onStorySeen={handleStorySeen}
            />
            <CreatePost
                user={currentUser}
                onPostCreated={addPost}
            />
            <PostFeed
                posts={posts}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />
            <BottomNav/>
        </div>
    )
}