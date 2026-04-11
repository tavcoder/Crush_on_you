import { Avatar } from "../../ui/avatar/Avatar.jsx"
import './UserInfo.css'

export function UserInfo({ user, isCurrentUser, avatarSize, primaryText, secondaryText, action, direction = "row" }) {
    return (
        <div className="user-info">
            <div className={`user-info__content user-info__content--${direction}`}>
                <Avatar
                    user={user}
                    avatarSize={avatarSize}
                    isCurrentUser={isCurrentUser} />
                <div className="user-info__text">
                    <p className='user-info__primary-text'>{primaryText}</p>
                    <p className='user-info__secondary-text'>{secondaryText}</p>
                </div>
            </div>
            {action && direction === "row" && action}
        </div>
    )
}