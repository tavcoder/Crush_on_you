//LeftSideBar.jsx
import { useUserSuggestionsList } from "../../../hooks/useUserSuggestionsList.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import { UserSuggestionsCard } from "../userSuggestionsCard/UserSuggestionsCard.jsx"

export function LeftSideBar({ user, isLoading, currentUser, error: currentUserError }) {
    const { suggestionsList, isLoading: suggestionsLoading, isError, error } = useUserSuggestionsList()

    return (
        <aside className="sidebar left-sidebar">
            <ProfileCard
                user={user}
                isLoading={isLoading}
                error={currentUserError}
            />
            <UserSuggestionsCard
                currentUser={currentUser}
                userSuggestionsList={suggestionsList}
                isLoading={suggestionsLoading}
                isError={isError}
                error={error}
            />

        </aside>
    );
}