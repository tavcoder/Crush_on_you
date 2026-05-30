//SideBar.jsx
import { useUserPosts } from "../../../hooks/usePosts.js"
import { ProfileCard } from "../profileCard/ProfileCard.jsx"
import './SideBar.css'

export function SideBar({ user, isLoading }) {

    const userId = user?.id
    const { data: postsData } = useUserPosts(userId)
    const postsCount = postsData?.data?.length ?? 0
    return (
        <aside className="sidebar">
            <ProfileCard user={user} postsCount={postsCount} isLoading={isLoading} />
        </aside>
    );
}