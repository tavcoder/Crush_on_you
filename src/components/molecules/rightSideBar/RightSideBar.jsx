//RightSideBar.jsx
import { useOnlineUsers } from "../../../hooks/useOnlineUsers.js"
import { UsersOnlineCard } from "../usersOnlineCard/UsersOnlineCard.jsx"
import './RightSideBar.css'

export function RightSideBar({onUserClick}) {

    const { onlineUsers, isLoading, isError, error } = useOnlineUsers()

    return (
        <aside className="right-sidebar">
            <UsersOnlineCard
                onlineUsers={onlineUsers}
                isLoading={isLoading}
                isError={isError}
                error={error}
                onUserClick={onUserClick} />
        </aside>
    );
}