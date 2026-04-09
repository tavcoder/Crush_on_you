import { IconButton } from '../../ui/iconButton/IconButton.jsx'
import { getStatsFormat } from '../../../utils/formatUtils.js'
import { Heart, MessageCircle, Share, Bookmark } from "lucide-react"
import './PostStats.css'

export function PostStats({ stats, isLiked = false, isBookmarked = false, onLike, onBookmark }) {

    return (
        <div className='post-stats'>
            <div className='post-stats__counters'>
                <IconButton
                    icon={<Heart fill={isLiked ? "currentColor" : "none"} />}
                    active={isLiked}
                    ariaLabel={isLiked ? "Remove like" : "Like post"}
                    onClick={onLike}
                    variant="icon-text"
                    direction="row">
                    {getStatsFormat(stats?.likesCount ?? 0)}
                </IconButton>

                <IconButton
                    icon={<MessageCircle />}
                    ariaLabel="coments count"
                    variant="icon-text"
                    direction="row">
                    {getStatsFormat(stats?.commentsCount ?? 0)}
                </IconButton>

                <IconButton
                    icon={<Share />}
                    ariaLabel="shares count"
                    variant="icon-text"
                    direction="row">
                    {getStatsFormat(stats?.sharesCount ?? 0)}
                </IconButton>
            </div>
            <IconButton
                icon={<Bookmark fill={isBookmarked ? "currentColor" : "none"} />}
                active={isBookmarked}
                ariaLabel={isBookmarked ? "Remove bookmark" : "Save post"}
                onClick={onBookmark}
                variant="ghost"
            />
        </div>
    )

}