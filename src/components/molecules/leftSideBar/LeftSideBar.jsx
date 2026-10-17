//LeftSideBar.jsx
import { useUserSuggestionsList } from "../../../hooks/useUserSuggestionsList.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import { UserSuggestionsCard } from "../userSuggestionsCard/UserSuggestionsCard.jsx"
import './LeftSideBar.css'

export function LeftSideBar({ user, isLoading, currentUser }) {
    const { suggestionsList, isLoading: suggestionsLoading, isError, error } = useUserSuggestionsList()

    return (
        <aside className="sidebar left-sidebar">
            <ProfileCard
                user={user}
                isLoading={isLoading}
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