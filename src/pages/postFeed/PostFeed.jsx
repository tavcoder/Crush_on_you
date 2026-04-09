import { PostCard } from '../../components/organism/postCard/PostCard.jsx'
import { EmptyState } from '../../components/feedback/EmptyState.jsx'
import './PostFeed.css'

export function PostFeed({ posts }) {
    if (!posts?.length) return <EmptyState content={"No posts yet. Be the first to share something!"} />;
    return (
        <ul className='post-feed'>
            {posts.map(postItem => (
                <li key={postItem.id}>
                    <PostCard post={postItem} />
                </li>
            ))}
        </ul>
    )
}