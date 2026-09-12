import { UserInfo } from '../../molecules/userInfo/UserInfo'
import { getFollowedByFormat } from '../../../utils/formatUtils.js'
import { FollowButton } from '../../ui/followButton/FollowButton'
import './UsersList.css'


export function UsersList({ usersList, currentUser, type = 'suggestions', onUserClick }) {


    return (
        <ul className='users-list ' role='list'>
            {usersList?.map((user) => {

                const userFollower = currentUser?.followers?.some((followerUser) => followerUser.userId === user.id);
                const secondaryText = userFollower ? `Following you` : undefined;

                return (
                    <li key={user.id} className='users-list__item' role='listitem'>
                        <button
                            className="btn-reset users-list__user-button"
                            onClick={() => onUserClick(user)}>
                            <UserInfo
                                user={user}
                                avatarSize="sm"
                                primaryText={user.userNick}
                                secondaryText={type === 'suggestions' ? getFollowedByFormat(user?.followedBy) : secondaryText}
                            />
                        </button>
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