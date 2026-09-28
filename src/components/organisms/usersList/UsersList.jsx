import { UserInfo } from '../../molecules/userInfo/UserInfo'
import { FollowButton } from '../../ui/followButton/FollowButton'
import { getFollowedByFormat } from '../../../utils/formatUtils.js'
import { useProfilePath } from '../../../hooks/useProfilePath.js'
import './UsersList.css'


export function UsersList({ usersList, currentUser, type = 'suggestions' }) {
    const buildProfilePath = useProfilePath();

    return (
        <ul className='users-list ' role='list'>
            {usersList?.map((user) => {

                const userFollower = currentUser?.followers?.some((followerUser) => followerUser.userId === user.id);
                const secondaryText = userFollower ? `Following you` : undefined;

                return (
                    <li key={user.id} className='users-list__item' role='listitem'>

                        <UserInfo
                            user={user}
                            avatarSize="sm"
                            primaryText={user.userNick}
                            secondaryText={type === 'suggestions' ? getFollowedByFormat(user?.followedBy) : secondaryText}
                            to={buildProfilePath(user)}
                        />

                        <FollowButton
                            userId={user.id}
                            currentUser={currentUser}
                        />
                    </li>)
            }
            )}
        </ul >
    )
}