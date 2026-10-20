//UserStats.jsx
import { Link } from 'react-router'
import { getStatsFormat } from "../../../utils/formatUtils.js"
import { getTimelinePath, getPeoplePath } from "../../../utils/routeUtils.js"
import './UserStats.css'

/**
 * @param {Object} props
 * @param {number} props.postsCount
 * @param {number} props.followers
 * @param {number} props.following
 * @param {string} [props.userId] Id del perfil ajeno; omitido = usuario logueado
 */

export function UserStats({ postsCount, followers, following, userId }) {
    const formatCount = (n) => n == null ? '—' : getStatsFormat(n)
    return (
        <ul className="user-stats" role="list">
            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getTimelinePath(userId)}>
                    <span className="user-stats__count">
                        {formatCount(postsCount)}
                        {postsCount == null && <span className="sr-only">unavailable</span>}
                    </span>
                    <span className="user-stats__title">Posts</span>
                </Link>
            </li>

            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getPeoplePath('followers', userId)}>
                    <span className="user-stats__count">
                        {formatCount(followers)}
                        {followers == null && <span className="sr-only">unavailable</span>}
                    </span>
                    <span className="user-stats__title">Followers</span>
                </Link>
            </li>

            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getPeoplePath('following', userId)}>
                    <span className="user-stats__count">
                        {formatCount(following)}
                        {following == null && <span className="sr-only">unavailable</span>}
                    </span>
                    <span className="user-stats__title">Following</span>
                </Link>
            </li>
        </ul>
    )
}