import { useContext } from 'react'
import { useUserSuggestions } from '../hooks/useUsers'
import { UserAuthContext } from "../context/UserAuthContext"


export function useUserSuggestionsList(enabled = true) {
 
    const { users, isLoading, isError, error } = useUserSuggestions(enabled);
    const { currentUser, } = useContext(UserAuthContext);
    const currentsFollowings = currentUser?.following;

    const suggestionsList = users?.filter(result =>
        result.id !== currentUser?.id &&
        !currentsFollowings?.some(item =>
            result.id === item.userId
        )
    ).map(user => {
        // Paso 1 — encuentra la id del primer follower que el currentUser también sigue
        const matchId = user.followers?.find(follower =>
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