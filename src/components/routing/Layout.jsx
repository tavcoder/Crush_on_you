//Layout.jsx
import { useContext } from "react"
import { Outlet, useLocation } from "react-router"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "../ui/feedback/ErrorFallback.jsx"
import { NavBar } from "../molecules/navBar/NavBar"
import { LeftSideBar } from "../molecules/leftSideBar/LeftSideBar"
import { RightSideBar } from "../molecules/rightSideBar/RightSideBar"
import { BottomNav } from "../molecules/bottomNav/BottomNav"
import { StoriesBar } from "../organisms/storiesBar/StoriesBar"
import { UserAuthContext } from "../../context/UserAuthContext"
import { useSearch } from "../../hooks/useSearch"
import { useStories } from "../../hooks/useStories"
import { useViewedUserProfile } from "../../hooks/useViewedUserProfile.js"
import './Layout.css'


export function Layout() {
    const { pathname } = useLocation()
    const search = useSearch('posts')
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

                <LeftSideBar
                    user={displayUserProfile}
                    isLoading={currentUserLoading}
                    currentUser={currentUser}
                    error={currentUserError}
                />

                <main className="layout__main">
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
                        <Outlet
                            context={{
                                currentUser,
                                currentUserError,
                                displayUserProfile,
                                search,
                            }}
                        />
                    </ErrorBoundary>
                </main>
                <RightSideBar />
            </div>
            <BottomNav />
        </div>
    )
}