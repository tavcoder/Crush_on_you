/*PeoplePage.jsx*/
import { useOutletContext, useParams } from "react-router";
import { Pagination } from "../../components/ui/pagination/Pagination.jsx";
import { UsersList } from "../../components/organisms/usersList/UsersList";
import { ErrorFallback } from "../../components/ui/feedback/ErrorFallback.jsx";
import { EmptyState } from "../../components/ui/feedback/EmptyState.jsx";
import { usePeoplePage } from "./usePeoplePage.js";
import { getPeoplePageTitle, getPeoplePageEmptyMessage } from "./peoplePageContent.js";
import { PeoplePageSkeleton } from "./PeoplePageSkeleton.jsx";
import './PeoplePage.css'

export default function PeoplePage() {
    const { displayUserProfile, currentUser, onUserClick } = useOutletContext();

    const { type = "suggestions" } = useParams();
    const { users, isLoading, isEmpty, isError, error, pagination, setPage } = usePeoplePage(type, displayUserProfile?.id);


    const isOwnProfile = currentUser?.id === displayUserProfile?.id
    const pageTitle = getPeoplePageTitle(type, isOwnProfile, displayUserProfile?.userNick);
    const emptyMessage = getPeoplePageEmptyMessage(type, isOwnProfile, displayUserProfile?.userNick);

    if (isError) return <ErrorFallback error={error} />
    if (isEmpty) return (
        <section className='card suggestions-card'>
            <EmptyState
                content={emptyMessage}
                onClick={undefined}
                buttonText={undefined} />
        </section>
    )
    return (
        <section className="page-content card people-page">
            <h1 className="people-page__title">{pageTitle?.toUpperCase()}</h1>
            
            {isLoading && <PeoplePageSkeleton />}

            {!isLoading &&
                <UsersList usersList={users} currentUser={currentUser} type={type} onUserClick={onUserClick} />}

            <Pagination pagination={pagination} onPageChange={setPage} />

        </section>
    );
}