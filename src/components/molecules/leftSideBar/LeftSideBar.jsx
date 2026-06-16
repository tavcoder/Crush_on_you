//LeftSideBar.jsx
import { useUserPosts } from "../../../hooks/usePosts.js"
import { useCurrentUser } from '../../../hooks/useUsers.js';
import { useUserSuggestionsList } from "../../../hooks/useUserSuggestionsList.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import { UserSuggestionsCard } from "../userSuggestionsCard/UserSuggestionsCard.jsx"
import './LeftSideBar.css'

export function LeftSideBar({ user, isLoading }) {

    const userId = user?.id
    const { data: postsData } = useUserPosts(userId)
    const { data: currentUser } = useCurrentUser();
    const { suggestionsList, isLoading: suggestionsLoading, isError, error } = useUserSuggestionsList()

    const postsCount = postsData?.data?.length ?? 0
    return (
        <aside className="sidebar left-sidebar">
            <ProfileCard user={user} postsCount={postsCount} isLoading={isLoading} />
            <UserSuggestionsCard currentUser={currentUser} userSuggestionsList={suggestionsList} isLoading={suggestionsLoading} isError={isError} error={error} />

        </aside>
    );
}