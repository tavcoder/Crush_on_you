import { Link } from 'react-router'
import { UserInfo } from '../userInfo/UserInfo'
import { EmptyState } from '../../ui/feedback/EmptyState.jsx'
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx'
import { UsersOnlineCardSkeleton } from '../usersOnlineCard/UsersOnlineCardSkeleton.jsx'
import './UsersOnlineCard.css'

export function UsersOnlineCard({ onlineUsers, isLoading, isError, error, onUserClick }) {
    const noUsersOnline = onlineUsers?.length === 0;

    if (isLoading) return <UsersOnlineCardSkeleton />
    if (isError) return <ErrorFallback error={error} />
    if (noUsersOnline) return (
        <section className='card users-online-card'>
            <EmptyState
                content="None of your connections are online right now. Discover new people and keep exploring."
                onClick={undefined} /* TODO: implementar link a descubrir nuevos usuarios */
                buttonText={undefined} />
        </section>
    )
    return (
        <section className="card users-online-card">

            <h2 className='users-online-card__title'>MY CONTACTS ONLINE</h2>

            <ul className='users-online-card__users-list' role='list'>
                {onlineUsers.map((user) => (
                    <li key={user.id} >
                        <button
                            className="btn-reset"
                            onClick={() => onUserClick(user)}>
                            <UserInfo
                                user={user}
                                avatarSize="md"
                                direction='column'
                                primaryText={undefined}
                                secondaryText={user.userName}
                            />
                        </button>
                    </li>
                ))}
            </ul>

        </section>
    )
}