//UserStats.jsx
import { Link } from 'react-router'
import { getStatsFormat } from "../../../utils/formatUtils.js"
import './UserStats.css'

/**
 * @param {Object} props
 * @param {number} props.postsCount
 * @param {number} props.followers
 * @param {number} props.following
 */

export function UserStats({ postsCount, followers, following }) {
    return (
        <dl className="user-stats">
            <Link className='user-stats__item' to="/timeline">
                <dd className="user-stats__count">{getStatsFormat(postsCount)}</dd>
                <dt className="user-stats__title">POSTS</dt>
            </Link>

            <Link className='user-stats__item' to="/people/followers">
                <dd className="user-stats__count">{getStatsFormat(followers)}</dd>
                <dt className="user-stats__title">FOLLOWERS</dt>
            </Link>
            <Link className='user-stats__item' to="/people/following">
                <dd className="user-stats__count">{getStatsFormat(following)}</dd>
                <dt className="user-stats__title">FOLLOWING</dt>
            </Link>
        </dl>
    )
}