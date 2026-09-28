// ProfileCard.jsx
import { useContext } from "react"
import { MapPin } from "lucide-react"
import { UserInfo } from "../userInfo/UserInfo.jsx"
import { UserStats } from "../userStats/UserStats.jsx"
import { ProfileCardSkeleton } from "../profileCard/ProfileCardSkeleton.jsx"
import { getUserLocationFormat, getUserFullNameFormat } from "../../../utils/formatUtils.js"
import { useProfilePath } from "../../../hooks/useProfilePath.js"
import { useUserStats } from "../../../hooks/useUsers.js"
import { UserAuthContext } from "../../../context/UserAuthContext.jsx"
import './ProfileCard.css'

/**
 * @param {Object} props
 * @param {User} props.user
 * @param {boolean} props.isLoading
 */
export function ProfileCard({ user, isLoading }) {
    const { data: stats, isLoading: isStatsLoading } = useUserStats(user?.id)
    const { currentUser } = useContext(UserAuthContext)
    const buildProfilePath = useProfilePath()

    if (!user || isLoading || isStatsLoading || !stats) return <ProfileCardSkeleton />

    const isCurrentUser = user.id === currentUser?.id;
    const to = isCurrentUser ? '/profile' : buildProfilePath(user);

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
                to={to}
            />
            <UserStats
                postsCount={stats.postsCount}
                followers={stats.followersCount}
                following={stats.followingCount}
                userId={isCurrentUser ? undefined : user.id} />
        </section>
    )
}