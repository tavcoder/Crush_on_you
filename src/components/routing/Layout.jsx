//Layout.jsx
import { useContext } from "react"
import { Outlet } from "react-router"
import { NavBar } from "../molecules/navBar/NavBar"
import { StoriesBar } from "../organisms/storiesBar/StoriesBar"
import { LeftSideBar } from "../molecules/leftSideBar/LeftSideBar"
import { RightSideBar } from "../molecules/rightSideBar/RightSideBar"
import { BottomNav } from "../molecules/bottomNav/BottomNav"
import { UserAuthContext } from "../../context/UserAuthContext"
import { useSearch } from "../../hooks/useSearch"
import { useStories } from "../../hooks/useStories"
import { useViewedUserProfile } from "../../hooks/useViewedUserProfile.js"
import './Layout.css'


export function Layout() {
    const { results, isLoading: isSearchLoading, isSearching, query, error: searchingError, hasNextPage: canLoadMoreSearch, fetchNextPage: loadMoreSearch, isFetchingNextPage: isFetchingNextPageSearch } = useSearch('posts')
    const { currentUser, isLoading: currentUserLoading, error: currentUserError } = useContext(UserAuthContext)
    const { stories, onStorySeen } = useStories()
    const { viewedUser: displayUserProfile } = useViewedUserProfile(currentUser)

    return (
        <div className="layout">
            <NavBar user={currentUser} />
            <StoriesBar
                currentUser={currentUser}
                users={stories}
                onStorySeen={onStorySeen}
            />
            <div className="layout__body">
                <LeftSideBar user={displayUserProfile} isLoading={currentUserLoading} currentUser={currentUser} />
                <main className="layout__main">
                    <Outlet
                        context={{
                            currentUser,
                            currentUserError,
                            displayUserProfile,
                            isSearching,
                            isSearchLoading,
                            isFetchingNextPageSearch,
                            canLoadMoreSearch,
                            loadMoreSearch,
                            searchingError,
                            results,
                            query,

                        }}
                    />
                </main>
                <RightSideBar />
            </div>
            <BottomNav />
        </div>
    )
}