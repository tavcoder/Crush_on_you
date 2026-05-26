/*UserStory.jsx*/
import { Avatar } from '../../ui/avatar/Avatar.jsx'
import './UserStory.css'

export function UserStory({ user, hasStory, isUnseen, avatarSize, onSeen }) {
    return (
        <button className='btn-reset user-story__item' onClick={onSeen}>
            <Avatar
                user={user}
                hasStory={hasStory}
                isUnseen={isUnseen}
                avatarSize={avatarSize}
            />
            <p className='user-story__user-name'>{user.userNick}</p>
        </button>
    )
}