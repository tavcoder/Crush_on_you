import { useCurrentUser, useUserSuggestions } from '../hooks/useUsers'


export function useUserSuggestionsList() {
    const { data: currentUser } = useCurrentUser()
    const { users, isLoading, isError, error } = useUserSuggestions();
    const currentsFollowings = currentUser?.following;

    const suggestionsList = users?.filter(result =>
        result.id !== currentUser?.id &&
        !currentsFollowings?.some(item =>
            result.id === item.userId
        )
    ).map(user => {
        // Paso 1 — encuentra la id del primer follower que el currentUser también sigue
        const matchId = user.followers.find(follower =>
            currentsFollowings?.some(following => following.userId === follower.userId)
        )?.userId

        // Paso 2 — con esa id busca el usuario completo en users
        const followedBy = matchId ? users.find(u => u.id === matchId) : null
        return { ...user, followedBy }
    })
    return {
        suggestionsList,
        isLoading,
        isError,
        error,
    }
}