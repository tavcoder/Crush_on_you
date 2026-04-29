// pages/DevPage.jsx
import { Globe, Users } from "lucide-react";
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { CreatePost } from "../components/organisms/createPost/CreatePost.jsx";
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { NavBar } from "../components/molecules/navBar/NavBar.jsx"
import { BottomNav } from "../components/molecules/bottomNav/BottomNav.jsx"
import { SelectButton } from "../components/ui/selectButton/SelectButton.jsx"
import { useSearch } from '../hooks/useSearch.js'
import { useCurrentUser } from '../hooks/useUsers.js'
import { usePosts } from "../hooks/usePosts.js"
import { useFollowingList } from "../hooks/useFollowingList.js"


export function DevPage() {
    const { results, isSearching } = useSearch()
    const { data: currentUser } = useCurrentUser();
    const { posts, isLoading, hasMore, loadMore, addPost } = usePosts();
    const { users, handleStorySeen } = useFollowingList();
console.log('user',currentUser)
    return (<>
        <NavBar user={currentUser} />
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
            {isSearching && <p className="sr-only">Showing search results</p>}
            {results.map(post => <PostCard key={post.id} post={post} />)}
            {isSearching && results.length === 0 && (
                <p className="feed__empty">No posts match your search.</p>
            )}
            <PostFeed
                posts={posts}
                isLoading={isLoading}
                hasMore={hasMore}
                onLoadMore={loadMore}
            />
        </div>
        <BottomNav />
    </>
    )
}