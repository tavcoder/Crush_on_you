/*PostCard.jsx*/
import { MoreHorizontal } from "lucide-react";
import { UserInfo } from "../../molecules/userInfo/UserInfo.jsx"
import { PostMedia } from "../../molecules/postMedia/PostMedia.jsx"
import { PostStats } from "../../molecules/postStats/PostStats.jsx"
import { IconButton } from "../../ui/iconButton/IconButton.jsx"
import { HighlightedText } from "../../ui/highlightedText/HighlightedText.jsx"
import { getDateFormat, getUserFullNameFormat } from "../../../utils/formatUtils.js"
import { useLikePost, useBookmarkPost } from "../../../hooks/usePosts.js"
import './PostCard.css'

/** @typedef {import('../../../services/contracts/types.js').Post} Post */

/**
 * @param {Object} props
 * @param {Post} props.post
 */

export function PostCard({ post, query, isCurrentUser }) {
    const { mutate: likePost } = useLikePost()
    const { mutate: bookmarkPost } = useBookmarkPost()

    const handleBookmark = () => {
        bookmarkPost(post.id)
    }
     const handleLike = () => {
        likePost(post.id)
    }
    
    const {
        author,
        createdAt,
        images,
        profileDetails,
        content,
        stats,
        isLiked,
        stats: { likesCount } = {},
        isBookmarked,

    } = post || {};

    const primaryText = getUserFullNameFormat(author);
    const secondaryText = getDateFormat(createdAt);

    return (
        <article className='card post-card'>
            <UserInfo
                user={author}
                query={query}
                isCurrentUser={isCurrentUser}
                avatarSize="md"
                primaryText={primaryText}
                secondaryText={secondaryText}
                direction="row"
                action={<IconButton
                    icon={<MoreHorizontal />}
                    variant="ghost"
                    ariaLabel="Post options"
                    disabled
                    tooltip="More options coming soon" />}
            />
            <PostMedia
                images={images}
                metadata={profileDetails}
            />
            {content && <p className='post-card__content'><HighlightedText text={content} query={query} /></p>}

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