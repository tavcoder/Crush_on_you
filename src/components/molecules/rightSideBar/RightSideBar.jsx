//RightSideBar.jsx
import { useOnlineUsers } from "../../../hooks/useOnlineUsers.js"
import { UsersOnlineCard } from "../usersOnlineCard/UsersOnlineCard.jsx"
import './RightSideBar.css'

export function RightSideBar() {

    const { onlineUsers, isLoading, isSuccess, isError, error } = useOnlineUsers()

    return (
        <aside className="sidebar right-sidebar">
            <UsersOnlineCard
                onlineUsers={onlineUsers}
                isLoading={isLoading}
                isSuccess={isSuccess}
                isError={isError}
                error={error}
            />
        </aside>
    );
}