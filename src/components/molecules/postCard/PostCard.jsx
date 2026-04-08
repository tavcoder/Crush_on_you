import { useState } from "react"
import { UserInfo } from "../userInfo/UserInfo.jsx"
import { PostMedia } from "../postMedia/PostMedia.jsx"
import { PostStats } from "../postStats/PostStats.jsx"
import { IconButton } from "../../ui/iconButton/IconButton.jsx"
import { getDateFormat, getUserFullName } from "../../../utils/formatUtils.js"
import './PostCard.css'

/** @typedef {import('../../../services/contracts/types.js').Post} Post */

/**
 * @param {Object} props
 * @param {Post} props.post
 */

export function PostCard({ post }) {
    const [isLiked, setIsLiked] = useState(post.isLiked)
    const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked)
    const [likesCount, setLikesCount] = useState(post.stats.likesCount)

    const handleLike = () => {
        setIsLiked(prev => !prev)
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    const handleBookmark = () => {
        setIsBookmarked(prev => !prev)
    }
    const {
        author,
        createdAt,
        images,
        profileDetails,
        content,
        stats,
    } = post || {};

    const primaryText = getUserFullName(author);
    const secondaryText = getDateFormat(createdAt);

    return (
        <article className='post-card'>
            <UserInfo
                user={author}
                avatarSize="md"
                primaryText={primaryText}
                secondaryText={secondaryText}
                direction="row"
                action={<IconButton
                    icon="..."
                    variant="ghost"
                    ariaLabel="Post options" />}
            />
            <PostMedia
                images={images}
                metadata={profileDetails}
            />
            {content && <p className='post-card__content'>{content}</p>}

            <PostStats
                stats={{ ...stats, likesCount }}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
                onLike={handleLike}
                onBookmark={handleBookmark}
            />
        </article>
    )
}