import { UserInfo } from '../../molecules/userInfo/UserInfo'
import { getFollowedByFormat } from '../../../utils/formatUtils.js'
import { FollowButton } from '../../ui/followButton/FollowButton'
import './UsersList.css'


export function UsersList({ usersList, currentUser, type = 'suggestions' }) {


    return (
        <ul className='users-list' role='list'>
            {usersList?.map((user) => {

                const userFollower = currentUser?.followers?.some((followerUser) => followerUser.userId === user.id);
                const secondaryText = userFollower ? `Following you` : undefined;

                return (
                    <li key={user.id} >
                        <UserInfo
                            user={user}
                            avatarSize="sm"
                            primaryText={user.userNick}
                            secondaryText={type === 'suggestions' ? getFollowedByFormat(user?.followedBy) : secondaryText}
                            action={<FollowButton
                                userId={user.id}
                                currentUser={currentUser}
                            />}
                        />
                    </li>)
            }
            )}
        </ul >
    )
}