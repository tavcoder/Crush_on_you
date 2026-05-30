// pages/DevPage.jsx
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { CreatePost } from "../components/organisms/createPost/CreatePost.jsx";
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { NavBar } from "../components/molecules/navBar/NavBar.jsx"
import { BottomNav } from "../components/molecules/bottomNav/BottomNav.jsx"
import { SelectButton } from "../components/ui/selectButton/SelectButton.jsx"
import { SideBar } from "../components/molecules/sideBar/SideBar.jsx"
import { useSearch } from '../hooks/useSearch.js'
import { useCurrentUser } from '../hooks/useUsers.js'
import { usePosts } from "../hooks/usePosts.js"
import { useStories } from "../hooks/useStories.js"


// DevPage.jsx
export function DevPage() {
    const { results, isLoading: isSearchLoading, isSearching, query } = useSearch('posts')
    const { data: currentUser, loading: currentUserLoading } = useCurrentUser()
    const { posts, isLoading, addPost } = usePosts()
    const { stories, onStorySeen } = useStories()
    // Si hay búsqueda activa, muestra resultados — si no, muestra el feed normal
    const displayPosts = isSearching ? results : posts
    const displayLoading = isSearching ? isSearchLoading : isLoading
    return (<>
        <NavBar user={currentUser} />
        <StoriesBar
            currentUser={currentUser}
            users={stories}
            onStorySeen={onStorySeen}
        />
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
            <SideBar user={currentUser} isLoading={currentUserLoading} />
            <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                <CreatePost user={currentUser} onPostCreated={addPost} />

                {isSearching && results.length === 0 && !isSearchLoading && (
                    <p className="feed__empty">No posts match "{query}"</p>
                )}

                <PostFeed
                    posts={displayPosts}
                    isLoading={displayLoading}
                />
            </div>
        </div>
        <BottomNav />
    </>)
}