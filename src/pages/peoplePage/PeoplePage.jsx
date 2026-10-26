/*PeoplePage.jsx*/
import { useOutletContext, useParams, Navigate } from "react-router";
import { PeoplePageContent } from "./PeoplePageContent.jsx";
import { isValidPeopleType } from "./peopleTypes.js";

export default function PeoplePage() {
    const { displayUserProfile, currentUser, displayUserError, search } = useOutletContext();

    const { type = "suggestions" } = useParams();

    if (!isValidPeopleType(type)) {
        return <Navigate to="/people/suggestions" replace />;
    }
    return (
        <PeoplePageContent
            key={`${type}-${displayUserProfile?.id ?? ''}`}
            type={type}
            displayUserProfile={displayUserProfile}
            currentUser={currentUser}
            profileError={displayUserError}
            search={search}
        />
    );
}