import { useFollowUser, useUnfollowUser } from '../../../hooks/useFollows.js'
import { RoundButton } from '../roundButton/RoundButton'

export function FollowButton({ userId, currentUser }) {
    const { mutate: follow } = useFollowUser()
    const { mutate: unfollow } = useUnfollowUser()
    const isFollowing = currentUser?.following?.some(user => user.userId === userId);

    const handleFollowToggle = () => {
        if (isFollowing) {
            unfollow(userId)
        } else {
            follow(userId)
        }
    }
    return (
        < RoundButton
            onClick={handleFollowToggle}
            buttonSize="md"
            buttonText={isFollowing ? "-" : "+"}
            ariaLabel={isFollowing ? "Unfollow user" : "Follow user"}
        />

    )
}