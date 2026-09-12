/*PeoplePage.jsx*/
import { useOutletContext, useParams } from "react-router";
import { PeoplePageContent } from "./PeoplePageContent.jsx";
import { isValidPeopleType } from "./peopleTypes.js";
import { ErrorFallback } from "../../components/ui/feedback/ErrorFallback.jsx";

export default function PeoplePage() {
    const { displayUserProfile, currentUser, onUserClick } = useOutletContext();

    const { type = "suggestions" } = useParams();

    if (!isValidPeopleType(type)) {
        return <ErrorFallback error={new Error(`"${type}" is not a valid section.`)} />;
    }
    return (
        <PeoplePageContent
            key={`${type}-${displayUserProfile?.id ?? ''}`}
            type={type}
            displayUserProfile={displayUserProfile}
            currentUser={currentUser}
            onUserClick={onUserClick}
        />
    );
}