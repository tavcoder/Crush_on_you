// ProfileCard.jsx
import { useContext } from "react"
import { MapPin } from "lucide-react"
import { UserInfo } from "../userInfo/UserInfo.jsx"
import { UserStats } from "../userStats/UserStats.jsx"
import { ProfileCardSkeleton } from "../profileCard/ProfileCardSkeleton.jsx"
import { ErrorFallback } from "../../ui/feedback/ErrorFallback.jsx"
import { getUserLocationFormat, getUserFullNameFormat } from "../../../utils/formatUtils.js"
import { useProfilePath } from "../../../hooks/useProfilePath.js"
import { useUserStats } from "../../../hooks/useUsers.js"
import { UserAuthContext } from "../../../context/UserAuthContext.jsx"
import './ProfileCard.css'

/**
 * @param {Object} props
 * @param {User} props.user
 * @param {boolean} props.isLoading
 * @param {Error} props.error
 */
export function ProfileCard({ user, isLoading, error }) {
    console.log({ user, isLoading, error })
    const { data: stats, isLoading: isStatsLoading } = useUserStats(user?.id)
    const { currentUser } = useContext(UserAuthContext)
    const buildProfilePath = useProfilePath()

    if (!user && error) return <ErrorFallback error={error} />
    if (!user || isLoading || isStatsLoading) return <ProfileCardSkeleton />


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
                postsCount={stats?.postsCount}
                followers={stats?.followersCount}
                following={stats?.followingCount}
                userId={isCurrentUser ? undefined : user.id} />
        </section>
    )
}