// pages/FeedPage.jsx
import { useOutletContext } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { usePosts } from "../../hooks/usePosts.js"

export default function FeedPage() {
    const { posts,
        fetchNextPage: loadMorePosts,
        hasNextPage: canLoadMorePosts,
        isLoading,
        isFetchingNextPage,
        error,
        addPost,
        isAddingPost, } = usePosts()
    const { currentUser, currentUserError, isSearching, isSearchLoading, searchingError, loadMoreSearch, canLoadMoreSearch, isFetchingNextPageSearch, results, query } = useOutletContext();
    // Si hay búsqueda activa, muestra resultados — si no, muestra el feed normal
    const displayPosts = isSearching ? results : posts
    const displayLoading = isSearching ? isSearchLoading : isLoading
    const displayError = error ? error : currentUserError ? currentUserError : searchingError
    const displayCanLoadMore = isSearching ? canLoadMoreSearch : canLoadMorePosts
    const displayLoadMore = isSearching ? loadMoreSearch : loadMorePosts
    const displayIsFetchingNextPage = isSearching ? isFetchingNextPageSearch : isFetchingNextPage
    const emptyMessage = isSearching ? `No posts match "${query}"` : "No posts yet. Be the first to share something!"

    return (

        <section className="page-content">

            <CreatePost user={currentUser} onPostCreated={addPost} isSubmitting={isAddingPost} />
            <SortByCard
                onChange={undefined} //TODO: consumirá un hook useSortPosts que decide la estrategia de fetching.
                disabled={undefined} />

            <PostFeed
                query={query}
                posts={displayPosts}
                isInitialLoading={displayLoading}
                isLoadingNextPage={displayIsFetchingNextPage}
                canLoadMore={displayCanLoadMore}
                onLoadMore={displayLoadMore}
                emptyMessage={emptyMessage}
                error={displayError}
            />

        </section>
    )
}