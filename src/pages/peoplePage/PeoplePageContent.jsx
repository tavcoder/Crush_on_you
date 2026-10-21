/*PeoplePageContent.jsx*/
import { Pagination } from "../../components/ui/pagination/Pagination.jsx";
import { UsersList } from "../../components/organisms/usersList/UsersList.jsx";
import { ErrorFallback } from "../../components/ui/feedback/ErrorFallback.jsx";
import { EmptyState } from "../../components/ui/feedback/EmptyState.jsx";
import { usePeoplePage } from "./usePeoplePage.js";
import { useRetryAll } from "../../hooks/useRetryAll.js";
import { getPeoplePageTitle, getPeoplePageEmptyMessage } from "./peoplePageContent.js";
import { PeoplePageSkeleton } from "./PeoplePageSkeleton.jsx";
import './PeoplePageContent.css'

export function PeoplePageContent({ type, displayUserProfile, currentUser, profileError }) {

    const { users, isLoading, isEmpty, isError, error, pagination, setPage } = usePeoplePage(type, displayUserProfile?.id, profileError);
    const retryAll = useRetryAll();

    const isOwnProfile = currentUser?.id === displayUserProfile?.id
    const pageTitle = getPeoplePageTitle(type, isOwnProfile, displayUserProfile?.userNick);
    const emptyMessage = getPeoplePageEmptyMessage(type, isOwnProfile, displayUserProfile?.userNick);

    if (isError) return <ErrorFallback error={error} onRetry={retryAll} />
    if (isEmpty) return (
        <section className='card suggestions-card people-page__empty-card'>
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
                <UsersList usersList={users} currentUser={currentUser} type={type} />}

            <Pagination pagination={pagination} onPageChange={setPage} />

        </section>
    );
}