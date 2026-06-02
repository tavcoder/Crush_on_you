// pages/DevPage.jsx
import { useState } from "react"
import { StoriesBar } from "../components/organisms/storiesBar/StoriesBar.jsx"
import { CreatePost } from "../components/organisms/createPost/CreatePost.jsx";
import { PostFeed } from "../components/organisms/postFeed/PostFeed.jsx"
import { NavBar } from "../components/molecules/navBar/NavBar.jsx"
import { BottomNav } from "../components/molecules/bottomNav/BottomNav.jsx"
import { SelectButton } from "../components/ui/selectButton/SelectButton.jsx"
import { LeftSideBar } from "../components/molecules/leftSideBar/LeftSideBar.jsx"
import { RightSideBar } from "../components/molecules/rightSideBar/RightSideBar.jsx"
import { useSearch } from '../hooks/useSearch.js'
import { useCurrentUser } from '../hooks/useUsers.js'
import { usePosts, useUserPosts } from "../hooks/usePosts.js"
import { useStories } from "../hooks/useStories.js"


// DevPage.jsx
export function DevPage() {
    const [selectedUserId, setSelectedUserId] = useState(null)
    const { results, isLoading: isSearchLoading, isSearching, query } = useSearch('posts')
    const { data: currentUser, loading: currentUserLoading } = useCurrentUser()
    const { posts, isLoading, addPost } = usePosts()
    const { data: userPosts, isLoading: userPostLoading, } = useUserPosts()
    const { stories, onStorySeen } = useStories()
    // Si hay búsqueda activa, muestra resultados — si no, muestra el feed normal
    const displayPosts = isSearching ? results : selectedUserId ? userPosts : posts
    const displayLoading = isSearching ? isSearchLoading : userPostLoading ? userPostLoading : isLoading
    return (<>
        <NavBar user={currentUser} />
        <StoriesBar
            currentUser={currentUser}
            users={stories}
            onStorySeen={onStorySeen}
        />
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
            <LeftSideBar user={selectedUserId} isLoading={currentUserLoading} />
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
            <RightSideBar onUserClick={setSelectedUserId} />

        </div>

        <BottomNav />
    </>)
}