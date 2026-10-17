// pages/TimelinePage.jsx
import { useOutletContext, useParams } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { useUserPosts, useCreatePost } from "../../hooks/usePosts.js"
import { useViewedUserProfile } from "../../hooks/useViewedUserProfile.js"
import { selectFeedSource } from "../../utils/selectFeedSource.js"


export default function TimelinePage() {
    const { userId } = useParams();
    const { currentUser, currentUserError, search } = useOutletContext();

    const { viewedUser: displayUserProfile,
        isOwnProfile,
        isLoading: isViewedUserLoading,
        error: viewedUserError,
    } = useViewedUserProfile(currentUser);

    // Posts en paralelo al perfil, sin esperar a que resuelva (no en cascada)
    const effectiveUserId = userId ?? currentUser?.id;

    const userPosts = useUserPosts(effectiveUserId)

    const { addPost, isAddingPost } = useCreatePost()

    const feedState = selectFeedSource({
        feed: {
            ...userPosts,
            isLoading: userPosts.isLoading || isViewedUserLoading,
            error: userPosts.error ?? viewedUserError ?? currentUserError,
        },
        search,
        emptyMessage: displayUserProfile
            ? `${displayUserProfile.userName ?? 'This user'} hasn't posted anything yet.`
            : "No posts yet. Be the first to share something!",
    })


    return (

        <section className="page-content">

            {isOwnProfile && <CreatePost user={currentUser} onPostCreated={addPost} isSubmitting={isAddingPost} />}
            <SortByCard
                onChange={undefined} //TODO: consumirá un hook useSortPosts que decide la estrategia de fetching.
                disabled={true} />

            <PostFeed
                query={search.query}
                posts={feedState.posts}
                isInitialLoading={feedState.isInitialLoading}
                isLoadingNextPage={feedState.isLoadingNextPage}
                canLoadMore={feedState.canLoadMore}
                onLoadMore={feedState.onLoadMore}
                emptyMessage={feedState.emptyMessage}
                error={feedState.error}
            />

        </section>
    )
}