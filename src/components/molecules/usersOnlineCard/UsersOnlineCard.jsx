/*UsersOnlineCard.jsx*/
import { UserInfo } from '../userInfo/UserInfo'
import { EmptyState } from '../../ui/feedback/EmptyState.jsx'
import { ErrorFallback } from '../../ui/feedback/ErrorFallback.jsx'
import { UsersOnlineCardSkeleton } from '../usersOnlineCard/UsersOnlineCardSkeleton.jsx'
import { useProfilePath } from '../../../hooks/useProfilePath.js'
import './UsersOnlineCard.css'

export function UsersOnlineCard({ onlineUsers, isLoading, isSuccess, isError, error }) {
    const buildProfilePath = useProfilePath();

    if (isLoading) return <UsersOnlineCardSkeleton />
    if (isError) return <ErrorFallback error={error} />
    if (!isSuccess) return;
    if (onlineUsers.length === 0) return (
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
                    <li key={user.id} className='users-online-card__user-item'>
                        <UserInfo
                            user={user}
                            avatarSize="md"
                            direction='column'
                            primaryText={undefined}
                            secondaryText={user.userName}
                            to={buildProfilePath(user)}
                        />
                    </li>
                ))}
            </ul>

        </section>
    )
}