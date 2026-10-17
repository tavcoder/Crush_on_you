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
    return (
        <ul className="user-stats" role="list">
            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getTimelinePath(userId)}>
                    <span className="user-stats__count">{getStatsFormat(postsCount)}</span>
                    <span className="user-stats__title">Posts</span>
                </Link>
            </li>

            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getPeoplePath('followers', userId)}>
                    <span className="user-stats__count">{getStatsFormat(followers)}</span>
                    <span className="user-stats__title">Followers</span>
                </Link>
            </li>

            <li className="user-stats__cell">
                <Link className='user-stats__item' to={getPeoplePath('following', userId)}>
                    <span className="user-stats__count">{getStatsFormat(following)}</span>
                    <span className="user-stats__title">Following</span>
                </Link>
            </li>
        </ul>
    )
}