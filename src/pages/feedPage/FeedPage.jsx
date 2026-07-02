// pages/FeedPage.jsx
import { useOutletContext } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { usePosts } from "../../hooks/usePosts.js"

export default function FeedPage() {
    const { posts, isLoading, error, addPost } = usePosts()
    const { currentUser, currentUserError, isSearching, isSearchLoading, searchingError, results, query } = useOutletContext();
    // Si hay búsqueda activa, muestra resultados — si no, muestra el feed normal
    const displayPosts = isSearching ? results : posts
    const displayLoading = isSearching ? isSearchLoading : isLoading
    const displayError = error ? error : currentUserError ? currentUserError : searchingError

    return (

        <section className="page-content">

            <CreatePost user={currentUser} onPostCreated={addPost} />
            <SortByCard
                onChange={undefined} //TODO: consumirá un hook useSortPosts que decide la estrategia de fetching.
                disabled={undefined} />
                
            {isSearching && results.length === 0 && !isSearchLoading && (
                <p className="feed__empty">No posts match "{query}"</p>
            )}

            <PostFeed
                posts={displayPosts}
                isLoading={displayLoading}
                error={displayError}
            />

        </section>
    )
}