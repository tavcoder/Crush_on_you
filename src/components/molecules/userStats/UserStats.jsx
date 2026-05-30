//UserStats.jsx
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
            <div className="user-stats__item">
                <dd className="user-stats__count">{getStatsFormat(postsCount)}</dd>
                <dt className="user-stats__title">POSTS</dt>
            </div>
            <div className="user-stats__item">
                <dd className="user-stats__count">{getStatsFormat(followers)}</dd>
                <dt className="user-stats__title">FOLLOWERS</dt>
            </div>
            <div className="user-stats__item">
                <dd className="user-stats__count">{getStatsFormat(following)}</dd>
                <dt className="user-stats__title">FOLLOWING</dt>
            </div>
        </dl>
    )
}