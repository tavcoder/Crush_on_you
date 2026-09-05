/*PeoplePage.jsx*/
import { useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { UsersList } from "../../components/organisms/usersList/UsersList";
import { useUserSuggestionsList } from "../../hooks/useUserSuggestionsList.js"
import { useFollowers, useFollowing } from "../../hooks/useFollows.js";


export default function PeoplePage() {
    const { displayUserProfile, currentUser } = useOutletContext();
    const [page, setPage] = useState(1);

    const { type = "suggestions" } = useParams();
    const { suggestionsList,
        isLoading: suggestionsLoading,
        isError: isSuggestionsError,
        error: suggestionsError }
        = useUserSuggestionsList(type === "suggestions");
    const { followers,
        isLoading: followersLoading,
        isError: isFollowersError,
        error: followersError }
        = useFollowers(displayUserProfile?.id, page, type === "followers");
    const { following,
        isLoading: followingLoading,
        isError: isFollowingError,
        error: followingError }
        = useFollowing(displayUserProfile?.id, page, type === "following");

    const usersByType = {
        suggestions: suggestionsList,
        followers: followers,
        following: following,
    };


    const users = usersByType[type];
    return (
        <>
            <h1>People Page</h1>
            <UsersList usersList={users} currentUser={currentUser} type={type} />
        </>
    );
}