import { Link } from 'react-router'
import { EmptyState } from '../../ui/feedback/EmptyState.jsx'
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx'
import { UsersList } from '../../organisms/usersList/UsersList.jsx'
import { UserSuggestionsCardSkeleton } from '../userSuggestionsCard/UserSuggestionsCardSkeleton.jsx'
import './UserSuggestionsCard.css'

export function UserSuggestionsCard({ currentUser, userSuggestionsList, isLoading, isError, error }) {
    const noSuggestions = userSuggestionsList?.length === 0;

    if (isLoading) return <UserSuggestionsCardSkeleton />
    if (isError) return <ErrorFallback error={error} />
    if (noSuggestions) return (
        <section className='card suggestions-card'>
            <EmptyState
                content="You're already following all our users. Invite a user who doesn't yet know about CrushOnYou."
                onClick={undefined} /* TODO: implementar share via WhatsApp/SMS cuando esté disponible */
                buttonText={undefined} />
        </section>
    )
    return (
        <section className="card suggestions-card">

            <div className='suggestions-card__header'>
                <h2 className='suggestions-card__title'>SUGGESTED FOR YOU</h2>
                <Link className='suggestions-card__link' to="/people/suggestions">See all</Link>
            </div>

            <UsersList usersList={userSuggestionsList} currentUser={currentUser} />

        </section>
    )
}