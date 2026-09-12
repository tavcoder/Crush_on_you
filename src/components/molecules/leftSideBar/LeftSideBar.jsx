//LeftSideBar.jsx
import { useNavigate } from 'react-router';
import { useUserSuggestionsList } from "../../../hooks/useUserSuggestionsList.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import { UserSuggestionsCard } from "../userSuggestionsCard/UserSuggestionsCard.jsx"
import './LeftSideBar.css'

export function LeftSideBar({ user, isLoading, currentUser, onUserClick }) {
    const isCurrentUser = user?.id === currentUser?.id;
    const { suggestionsList, isLoading: suggestionsLoading, isError, error } = useUserSuggestionsList()
    const navigate = useNavigate();

    const handleClick = () => {
        if (isCurrentUser) {
            navigate('/profile');  // ← Editar mi perfil
        }
        // Si no es currentUser, no hace nada (ya está seleccionado)
    };

    return (
        <aside className="sidebar left-sidebar">
            <ProfileCard
                user={user}
                isLoading={isLoading}
                isCurrentUser={isCurrentUser}
                onClick={isCurrentUser ? handleClick : onUserClick}
            />
            <UserSuggestionsCard
                currentUser={currentUser}
                userSuggestionsList={suggestionsList}
                isLoading={suggestionsLoading}
                isError={isError}
                error={error}
                onUserClick={onUserClick} />

        </aside>
    );
}