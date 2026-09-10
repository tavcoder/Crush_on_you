/*UsePeoplePage.js*/
import { useState } from "react";
import { useUserSuggestionsList } from "../../hooks/useUserSuggestionsList.js"
import { useFollowers, useFollowing } from "../../hooks/useFollows.js";

export function usePeoplePage(type, userId) {

    const [page, setPage] = useState(1);
    const { suggestionsList,
        isLoading: suggestionsLoading,
        isError: isSuggestionsError,
        error: suggestionsError }
        = useUserSuggestionsList(type === "suggestions");
    const { followers,
        pagination: followersPagination,
        isLoading: followersLoading,
        isError: isFollowersError,
        error: followersError }
        = useFollowers(userId, page, type === "followers");
    const { following,
        pagination: followingPagination,
        isLoading: followingLoading,
        isError: isFollowingError,
        error: followingError }
        = useFollowing(userId, page, type === "following");

    const dataByType = {
        suggestions: {
            users: suggestionsList,
            isLoading: suggestionsLoading,
            isError: isSuggestionsError,
            error: suggestionsError,
            pagination: null,
        },
        followers: {
            users: followers,
            isLoading: followersLoading,
            isError: isFollowersError,
            error: followersError,
            pagination: followersPagination,
        },
        following: {
            users: following,
            isLoading: followingLoading,
            isError: isFollowingError,
            error: followingError,
            pagination: followingPagination,
        }
    };

    if (!Object.keys(dataByType).includes(type)) {
        throw new Error(`Invalid people page type: ${type}`);
    }
    const { users, isLoading, isError, error, pagination } = dataByType[type];
    const isEmpty = !isLoading && !isError && users.length === 0;

    return {
        users,
        isLoading,
        isEmpty,
        isError,
        error,
        pagination,
        setPage,
    }
}