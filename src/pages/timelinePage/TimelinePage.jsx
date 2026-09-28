// pages/TimelinePage.jsx
import { useOutletContext, useParams } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { useUserPosts, useCreatePost } from "../../hooks/usePosts.js"
import { useViewedUserProfile } from "../../hooks/useViewedUserProfile.js"

export default function TimelinePage() {
    const { userId } = useParams();
    const { currentUser,
        currentUserError,
        isSearching,
        isSearchLoading,
        searchingError,
        loadMoreSearch,
        canLoadMoreSearch,
        isFetchingNextPageSearch,
        results,
        query } = useOutletContext();

    const { viewedUser: displayUserProfile,
        isOwnProfile,
        isLoading: isViewedUserLoading,
        error: viewedUserError,
    } = useViewedUserProfile(currentUser);

    // Posts en paralelo al perfil, sin esperar a que resuelva (no en cascada)
    const effectiveUserId = userId ?? currentUser?.id;

    const { posts,
        fetchNextPage: loadMorePosts,
        hasNextPage: canLoadMorePosts,
        isLoading,
        isFetchingNextPage,
        error, } = useUserPosts(effectiveUserId)

    const { addPost, isAddingPost } = useCreatePost()

    // Si hay búsqueda activa, muestra resultados — si no, muestra los posts del usuario
    const displayPosts = isSearching ? results : posts
    const displayLoading = isSearching ? isSearchLoading : (isLoading || isViewedUserLoading)
    const displayError = error ?? viewedUserError ?? currentUserError ?? searchingError
    const displayCanLoadMore = isSearching ? canLoadMoreSearch : canLoadMorePosts
    const displayLoadMore = isSearching ? loadMoreSearch : loadMorePosts
    const displayIsFetchingNextPage = isSearching ? isFetchingNextPageSearch : isFetchingNextPage
    const emptyMessage = isSearching
        ? `No posts match "${query}"`
        : displayUserProfile
            ? `${displayUserProfile.userName ?? 'This user'} hasn't posted anything yet.`
            : "No posts yet. Be the first to share something!"

    return (

        <section className="page-content">

            {isOwnProfile && <CreatePost user={currentUser} onPostCreated={addPost} isSubmitting={isAddingPost} />}
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