import { Link } from 'react-router'
import { UserInfo } from '../userInfo/UserInfo'
import { FollowButton } from '../../ui/followButton/FollowButton'
import { EmptyState } from '../../ui/feedback/EmptyState.jsx'
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx'
import { UserSuggestionsCardSkeleton } from '../userSuggestionsCard/UserSuggestionsCardSkeleton.jsx'
import { getFollowedByFormat } from '../../../utils/formatUtils.js'
import './UserSuggestionsCard.css'

export function UserSuggestionsCard({ currentUser, userSuggestionsList, isLoading, isError, error }) {
    const noSuggestions = userSuggestionsList?.length === 0;

    if (isLoading) return <UserSuggestionsCardSkeleton />
    if (isError) return <ErrorFallback error={error} />
    if (noSuggestions) return (
        <>
            <div className='suggestions-card__header'>...</div>
            <EmptyState
                content="You're already following all our users. Invite a user who doesn't yet know about CrushOnYou."
                onClick={undefined} /* TODO: implementar share via WhatsApp/SMS cuando esté disponible */
                buttonText={undefined} />
        </>
    )
    return (
        <section className="card suggestions-card__user-info">

            <div className='suggestions-card__header'>
                <h2 className='suggestions-card__title'>SUGGESTED FOR YOU</h2>
                <Link className='suggestions-card__link' to="/userSuggestions">See all</Link>
            </div>

            <ul className='suggestions-card__users-list' role='list'>
                {userSuggestionsList.map((user) => (
                    <li key={user.id}>
                        <UserInfo
                            user={user}
                            avatarSize="sm"
                            primaryText={user.userNick}
                            secondaryText={getFollowedByFormat(user?.followedBy)}
                            action={<FollowButton
                                userId={user.id}
                                currentUser={currentUser}
                            />}
                        />
                    </li>
                ))}
            </ul>

        </section>
    )
}