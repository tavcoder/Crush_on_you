import { Avatar } from "../../ui/avatar/Avatar.jsx"
import { HighlightedText } from "../../ui/highlightedText/HighlightedText.jsx"

import './UserInfo.css'

export function UserInfo({ user, query, isCurrentUser, avatarSize, primaryText, secondaryText, action, direction = "row" }) {
    return (
        <div className="user-info">
            <div className={`user-info__content user-info__content--${direction}`}>
                <Avatar
                    user={user}
                    avatarSize={avatarSize}
                    isCurrentUser={isCurrentUser} />
                <div className="user-info__text">
                    {primaryText && <p className='user-info__primary-text'><HighlightedText text={primaryText} query={query} /></p>}
                    {secondaryText && <p className='user-info__secondary-text'>{secondaryText}</p>}
                </div>
            </div>
            {action && direction === "row" && action}
        </div>
    )
}