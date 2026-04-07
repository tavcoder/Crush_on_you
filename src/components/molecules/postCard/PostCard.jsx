import { UserInfo } from "../userInfo/UserInfo.jsx"
import { PostMedia } from "../postMedia/PostMedia.jsx"
import { PostStats } from "../postStats/PostStats.jsx"
import { IconButton } from "../../ui/iconButton/IconButton.jsx"
import { getDateFormat, getUserFullName } from "../../../utils/formatUtils.js"
import './PostCard.css'

export function PostCard({ post }) {
    const {
        author,
        createdAt,
        images,
        profileDetails,
        content,
        stats,
        isLiked,
        isBookmarked
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
                img={images}
                metadata={profileDetails}
            />
            {content && <p className='post-card__content'>{content}</p>}

            <PostStats
                stats={stats}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
            />
        </article>
    )
}