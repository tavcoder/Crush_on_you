//Layout.jsx
import { useState } from "react"
import { Outlet } from "react-router"
import { NavBar } from "../molecules/navBar/NavBar"
import { StoriesBar } from "../organisms/storiesBar/StoriesBar"
import { LeftSideBar } from "../molecules/leftSideBar/LeftSideBar"
import { RightSideBar } from "../molecules/rightSideBar/RightSideBar"
import { BottomNav } from "../molecules/bottomNav/BottomNav"
import { useCurrentUser } from "../../hooks/useUsers"
import { useSearch } from "../../hooks/useSearch"
import { useStories } from "../../hooks/useStories"
import './Layout.css'


export function Layout() {
    const [selectedUser, setSelectedUser] = useState(null)// TODO: mover selectedUserId a contexto cuando se implemente navegación a perfiles.
    const { results, isLoading: isSearchLoading, isSearching, query, error: searchingError } = useSearch('posts')
    const { data: currentUser, loading: currentUserLoading, error: currentUserError } = useCurrentUser()
    const { stories, onStorySeen } = useStories()


    const displayUserProfile = selectedUser ? selectedUser : currentUser
    return (
        <div className="layout">
            <NavBar user={currentUser} />
            <StoriesBar
                currentUser={currentUser}
                users={stories}
                onStorySeen={onStorySeen}
            />
            <div className="layout__body">
                <LeftSideBar user={displayUserProfile} isLoading={currentUserLoading} />
                <main className="layout__main">
                    <Outlet
                        context={{
                            currentUser,
                            currentUserError,
                            selectedUser,
                            isSearching,
                            isSearchLoading,
                            searchingError,
                            results,
                            query,

                        }}
                    />
                </main>
                <RightSideBar onUserClick={setSelectedUser} />
            </div>
            <BottomNav />
        </div>
    )
}