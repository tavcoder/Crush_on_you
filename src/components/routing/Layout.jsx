//Layout.jsx
import { useState, useEffect, useContext } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { NavBar } from "../molecules/navBar/NavBar"
import { StoriesBar } from "../organisms/storiesBar/StoriesBar"
import { LeftSideBar } from "../molecules/leftSideBar/LeftSideBar"
import { RightSideBar } from "../molecules/rightSideBar/RightSideBar"
import { BottomNav } from "../molecules/bottomNav/BottomNav"
import { UserAuthContext } from "../../context/UserAuthContext"
import { useSearch } from "../../hooks/useSearch"
import { useStories } from "../../hooks/useStories"
import './Layout.css'


export function Layout() {
    const [selectedUser, setSelectedUser] = useState(null)// TODO: mover selectedUserId a contexto cuando se implemente navegación a perfiles.
    const { results, isLoading: isSearchLoading, isSearching, query, error: searchingError, hasNextPage: canLoadMoreSearch, fetchNextPage: loadMoreSearch, isFetchingNextPage: isFetchingNextPageSearch } = useSearch('posts')
    const { currentUser, isLoading: currentUserLoading, error: currentUserError } = useContext(UserAuthContext)
    const { stories, onStorySeen } = useStories()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleUserClick = (user) => {
        setSelectedUser(user)
        navigate('/timeline')
    }

    useEffect(() => {
        if (pathname === '/feed') {
            setSelectedUser(null)
        }
    }, [pathname])

    // TODO: displayUserProfile depende de la ruta — en /feed siempre muestra currentUser
    // aunque haya selectedUser, para no interferir con el contexto del feed. 
    //LeftSideBar no toma la decisión internamente basándose en la ruta porque
    // implica una llamada extra innecesaria cuando ya el objeto user está completo en memoria
    const displayUserProfile = pathname === '/feed' ? currentUser : selectedUser ?? currentUser

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
                            selectedUser,
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
                <RightSideBar onUserClick={handleUserClick} />
            </div>
            <BottomNav />
        </div>
    )
}