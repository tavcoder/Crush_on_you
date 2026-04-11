/*UserStory.jsx*/
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import './UserStory.css'

export function UserStory({ user, hasStory, isUnseen, avatarSize }) {
    return (
        <div className='user-story__item'>
            <Avatar
                user={user}
                hasStory={hasStory}
                isUnseen={isUnseen}
                avatarSize={avatarSize}
                badge="null"
            />
            <p className='user-story__user-name'>{user.userNick}</p>
        </div>
    )
}