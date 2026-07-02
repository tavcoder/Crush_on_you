// pages/TimelinePage.jsx
import { useOutletContext } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { useUserPosts } from "../../hooks/usePosts.js"

export default function TimelinePage() {
    const { currentUser, selectedUser, isSearching, isSearchLoading, results, query } = useOutletContext();
    const effectiveUser = selectedUser ?? currentUser
    const { data: posts, isLoading } = useUserPosts(effectiveUser?.id)
    // Si hay búsqueda activa, muestra resultados — si no, muestra el feed normal
    const displayPosts = isSearching ? results : posts?.data
    const displayLoading = isSearching ? isSearchLoading : isLoading

    return (<>

        <section className="page-content">
            <SortByCard
                onChange={undefined} //TODO: consumirá un hook useSortPosts que decide la estrategia de fetching.
                disabled={undefined} />

            {isSearching && results.length === 0 && !isSearchLoading && (
                <p className="feed__empty">No posts match "{query}"</p>
            )}

            <PostFeed
                posts={displayPosts}
                isLoading={displayLoading}
            />


        </section>

    </>)
}