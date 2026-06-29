//LeftSideBar.jsx
import { useNavigate } from 'react-router';
import { useUserPosts } from "../../../hooks/usePosts.js"
import { useUserSuggestionsList } from "../../../hooks/useUserSuggestionsList.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import { UserSuggestionsCard } from "../userSuggestionsCard/UserSuggestionsCard.jsx"
import './LeftSideBar.css'

export function LeftSideBar({ user, isLoading, currentUser }) {
    const isCurrentUser = user?.id === currentUser?.id;
    const userId = user?.id
    const { data: postsData } = useUserPosts(userId)
    const { suggestionsList, isLoading: suggestionsLoading, isError, error } = useUserSuggestionsList()
    const navigate = useNavigate();
    const postsCount = postsData?.data?.length ?? 0

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
                postsCount={postsCount}
                isLoading={isLoading}
                isCurrentUser={isCurrentUser}
                onClick={isCurrentUser ? handleClick : undefined} />
            <UserSuggestionsCard currentUser={currentUser} userSuggestionsList={suggestionsList} isLoading={suggestionsLoading} isError={isError} error={error} />

        </aside>
    );
}