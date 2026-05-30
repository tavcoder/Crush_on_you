// ProfileCard.jsx
import { MapPin } from "lucide-react"
import { UserInfo } from "../userInfo/UserInfo.jsx"
import { UserStats } from "../userStats/UserStats.jsx"
import { ProfileCardSkeleton } from "../profileCard/ProfileCardSkeleton.jsx"
import { getUserLocationFormat, getUserFullNameFormat } from "../../../utils/formatUtils.js"
import './ProfileCard.css'
/**
 * @param {Object} props
 * @param {User} props.user
 * @param {number} props.postsCount
 * @param {boolean} props.isLoading
 */

export function ProfileCard({ user, postsCount, isLoading }) {
    if (!user || isLoading) return <ProfileCardSkeleton />

    const { followers, following } = user;
    const primaryText = getUserFullNameFormat(user);
    const secondaryText = getUserLocationFormat(user);

    return (
        <section className="card profile-card__user-info">
            <UserInfo
                user={user}
                avatarSize="lg"
                primaryText={primaryText}
                secondaryText={
                    secondaryText ?
                        <><MapPin className="user-info--location-icon" /> {secondaryText}</>
                        : null
                }
                direction="column"
            />
            <UserStats
                postsCount={postsCount}
                followers={followers.length}
                following={following.length} />
        </section>
    )
}