/*UsePeoplePage.js*/
import { useState } from "react";
import { useUserSuggestionsList } from "../../hooks/useUserSuggestionsList.js"
import { useFollowers, useFollowing } from "../../hooks/useFollows.js";

export function usePeoplePage(type, userId, profileError, search) {

    const [page, setPage] = useState(1);

    const { suggestionsList,
        isLoading: suggestionsLoading,
        isError: isSuggestionsError,
        isSuccess: suggestionsSuccess,
        error: suggestionsError }
        = useUserSuggestionsList(type === "suggestions");
    const { followers,
        pagination: followersPagination,
        isLoading: followersLoading,
        isError: isFollowersError,
        isSuccess: followersSuccess,
        error: followersError }
        = useFollowers(userId, page, type === "followers" && !!userId);
    const { following,
        pagination: followingPagination,
        isLoading: followingLoading,
        isError: isFollowingError,
        isSuccess: followingSuccess,
        error: followingError }
        = useFollowing(userId, page, type === "following" && !!userId);

    const isSearching = Boolean(search?.isSearching)

    const dataByType = {
        suggestions: {
            users: suggestionsList,
            isLoading: suggestionsLoading,
            isError: isSuggestionsError,
            isSuccess: suggestionsSuccess,
            error: suggestionsError,
            pagination: null,
        },
        followers: {
            users: followers,
            isLoading: followersLoading,
            isError: isFollowersError,
            isSuccess: followersSuccess,
            error: followersError,
            pagination: followersPagination,
        },
        following: {
            users: following,
            isLoading: followingLoading,
            isError: isFollowingError,
            isSuccess: followingSuccess,
            error: followingError,
            pagination: followingPagination,
        }
    };

    const current = isSearching
        ? {
            users: search.results,
            isLoading: search.isLoading,
            isError: search.isError,
            error: search.error,
            isSuccess: search.isSuccess,
            pagination: search.pagination,
        }
        : dataByType[type]

    const { users, pagination } = current; 

    // followers/following dependen de que el perfil exista; suggestions no
    const needsProfile = !isSearching && type !== 'suggestions' && !userId;
    const isError = current.isError || (needsProfile && Boolean(profileError));
    const error = current.error ?? (needsProfile ? profileError : undefined);
    const isLoading = current.isLoading || (needsProfile && !profileError);
    const isEmpty = current.isSuccess && users.length === 0;

    const changePage = isSearching ? search.setPage : setPage

    return { users, isLoading, isEmpty, isError, error, pagination, setPage: changePage, isSearching };
}