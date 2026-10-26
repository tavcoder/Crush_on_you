//Layout.jsx
import { useContext } from "react"
import { Outlet, useLocation } from "react-router"
import { ErrorBoundary } from "react-error-boundary"
import { ErrorFallback } from "../ui/feedback/ErrorFallback.jsx"
import { ConnectionBanner } from "../ui/feedback/ConnectionBanner.jsx"
import { NavBar } from "../molecules/navBar/NavBar"
import { SearchBar } from "../molecules/searchBar/SearchBar.jsx"
import { LeftSideBar } from "../molecules/leftSideBar/LeftSideBar"
import { RightSideBar } from "../molecules/rightSideBar/RightSideBar"
import { BottomNav } from "../molecules/bottomNav/BottomNav"
import { StoriesBar } from "../organisms/storiesBar/StoriesBar"
import { CreatePostDialog } from "../organisms/createPost/CreatePostDialog.jsx"
import { useCreatePostDialog } from "../../components/organisms/createPost/useCreatePostDialog.js"
import { useSearch } from "../../hooks/useSearch"
import { useStories } from "../../hooks/useStories"
import { useViewedUserProfile } from "../../hooks/useViewedUserProfile.js"
import { UserAuthContext } from "../../context/UserAuthContext"
import './Layout.css'


export function Layout() {
    const { pathname } = useLocation()
    const isPeople = pathname.startsWith('/people')
    const search = useSearch(isPeople ? 'users' : 'posts')
    const { currentUser, isLoading: currentUserLoading, error: currentUserError } = useContext(UserAuthContext)
    const { stories, onStorySeen } = useStories()
    const { viewedUser: displayUserProfile, error: displayUserError } = useViewedUserProfile(currentUser)
    const createDialog = useCreatePostDialog()
    return (
        <div className="layout">

            <NavBar user={currentUser} />
            <ConnectionBanner />
            <StoriesBar
                currentUser={currentUser}
                users={stories}
                onStorySeen={onStorySeen}
            />
            <CreatePostDialog
                isOpen={createDialog.isOpen}
                onClose={createDialog.close}
                triggerRef={createDialog.triggerRef}
                user={currentUser}
                onPostCreated={createDialog.onPostCreated}
                isSubmitting={createDialog.isSubmitting}
            />
            <div className="layout__body">

                <LeftSideBar
                    user={displayUserProfile}
                    isLoading={currentUserLoading}
                    currentUser={currentUser}
                    error={displayUserError ?? currentUserError}
                />

                <main className="layout__main">
                    <SearchBar className="mobile-only mobile-search" />
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[pathname]}>
                        <Outlet
                            context={{
                                currentUser,
                                currentUserError,
                                currentUserLoading,
                                displayUserProfile,
                                displayUserError: displayUserError ?? currentUserError,
                                search,
                            }}
                        />
                    </ErrorBoundary>
                </main>
                <RightSideBar />
            </div>
            <BottomNav onCreate={createDialog.open} createButtonRef={createDialog.triggerRef} />

        </div>
    )
}