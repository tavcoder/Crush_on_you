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
        <dl className="user-stats">
            <Link className='user-stats__item' to={getTimelinePath(userId)}>
                <dd className="user-stats__count">{getStatsFormat(postsCount)}</dd>
                <dt className="user-stats__title">POSTS</dt>
            </Link>

            <Link className='user-stats__item' to={getPeoplePath('followers', userId)}>
                <dd className="user-stats__count">{getStatsFormat(followers)}</dd>
                <dt className="user-stats__title">FOLLOWERS</dt>
            </Link>
            <Link className='user-stats__item' to={getPeoplePath('following', userId)}>
                <dd className="user-stats__count">{getStatsFormat(following)}</dd>
                <dt className="user-stats__title">FOLLOWING</dt>
            </Link>
        </dl>
    )
}