import { Avatar } from "../../ui/avatar/Avatar.jsx"
import './UserInfo.css'

export function UserInfo({ user, avatarSize, primaryText, secondaryText, action, direction = "row" }) {
    return (
        <div className="user-info">
            <div className={`user-info__content user-info__content--${direction}`}>
                <Avatar
                    user={user}
                    avatarSize={avatarSize} />
                <div className="user-info__text">
                    <span className='user-info__primary-text'>{primaryText}</span>
                    <span className='user-info__secondary-text'>{secondaryText}</span>
                </div>
            </div>
            {action && direction === "row" && action}
        </div>
    )
}