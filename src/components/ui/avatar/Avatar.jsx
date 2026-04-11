/*Avatar.jsx*/
import { getColorVariant, getUsersInitials } from "../../../utils/avatarUtils.js";
import './Avatar.css'

/** @typedef {import('../../../services/contracts/types.js').User} User */

/**
 * @param {Object} props
 * @param {User} props.user
 * @param {'sm'|'md'|'lg'} [props.avatarSize]
 * @param {boolean} [props.hasStory]
 * @param {boolean} [props.isUnseen]
 * @param {ReactNode} [props.badge]
 * 
 */

export function Avatar({ user, isCurrentUser = false, avatarSize = "sm", hasStory = true, isUnseen = false, badge }) {
    if (!user) return null;
    const { id: userId, userName, userSurName, avatarUrl, isOnline } = user;
    const modifier = getColorVariant(userId, isCurrentUser);
    const initials = getUsersInitials(userName, userSurName);
    const ringClass = hasStory
        ? (isUnseen ? 'avatar--story-unseen' : 'avatar--story-seen')
        : 'avatar--no-story';
    return (
        <div className={`avatar avatar--${avatarSize} avatar--${modifier} ${ringClass}`}>
            {avatarUrl ? (
                <img src={avatarUrl} alt={`${userName} ${userSurName}`} />
            ) : (
                <span className="avatar__initials">{initials}</span>
            )}
            {!badge && isOnline && <div className={`avatar__online avatar__online--${avatarSize}`} aria-label="Usuario en línea" role="status" />}
        </div>
    )
}