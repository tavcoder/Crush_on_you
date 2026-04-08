/** @typedef {import('../../../services/contracts/types.js').User} User */

/**
 * @param {Object} props
 * @param {User} props.user
 * @param {boolean} [props.showStory]
 * @param {'sm'|'md'|'lg'} [props.avatarSize]
 */

import { useCurrentUser } from '../../../hooks/useCurrentUser.js'
import { getColorVariant, getUsersInitials } from "../../../utils/avatarUtils.js";
import './Avatar.css'

export function Avatar({ user, showStory = false, avatarSize = "sm" }) {
    const { currentUser } = useCurrentUser();
    if (!user) return null;
    const { id: userId, userName, userSurName, avatarUrl, isOnline } = user;
    const modifier = getColorVariant(userId, currentUser?.id);
    const initials = getUsersInitials(userName, userSurName);
    return (
        <div className={`avatar avatar--${avatarSize} avatar--${modifier} ${showStory ? 'avatar--story' : 'avatar--no-story'}`}>
            {avatarUrl ? (
                <img src={avatarUrl} alt={`${userName} ${userSurName}`} />
            ) : (
                <span className="avatar__initials">{initials}</span>
            )}
            {isOnline && <div className={`avatar__online avatar__online--${avatarSize}`} aria-label="Usuario en línea" role="status" />}
        </div>
    )
}