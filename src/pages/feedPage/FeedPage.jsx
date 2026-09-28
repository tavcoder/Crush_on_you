/*FeedPage.jsx*/
import { useOutletContext } from "react-router";
import { CreatePost } from "../../components/organisms/createPost/CreatePost.jsx";
import { SortByCard } from "../../components/molecules/sortByCard/SortByCard.jsx";
import { PostFeed } from "../../components/organisms/postFeed/PostFeed.jsx"
import { usePosts, useCreatePost } from "../../hooks/usePosts.js"
import { selectFeedSource } from "../../utils/selectFeedSource.js"

export default function FeedPage() {
    const feed = usePosts()

    const { addPost, isAddingPost } = useCreatePost()
    const { currentUser, currentUserError, search } = useOutletContext();


    const feedState = selectFeedSource({
        feed: { ...feed, error: feed.error ?? currentUserError },
        search,
        emptyMessage: "No posts yet. Be the first to share something!",
    })

    return (
        <section className="page-content">
            <CreatePost user={currentUser} onPostCreated={addPost} isSubmitting={isAddingPost} />
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