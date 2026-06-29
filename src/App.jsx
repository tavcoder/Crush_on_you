/*app.jsx*/
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LoadingFallback } from './components/ui/feedback/LoadingFallback.jsx'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx'
import { LoginPage } from './pages/authPage/LoginPage.jsx'
import { RegisterPage } from './pages/authPage/RegisterPage.jsx'
import { Layout } from './components/routing/Layout.jsx'
import './App.css'

// Lazy load de páginas que usan Layout
const FeedPage = lazy(() => import('./pages/feedPage/FeedPage.jsx'));
const TimelinePage = lazy(() => import('./pages/timelinePage/TimelinePage.jsx'));
const MyProfilePage = lazy(() => import('./pages/myProfilePage/MyProfilePage.jsx'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage.jsx'));


function App() {


  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Rutas SIN layout (públicas) */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<LoginPage />} />
            {/* Rutas CON layout (privadas) */}
            <Route element={<ProtectedRoute />} >
              <Route element={<Layout />}>
                <Route path="/profile" element={<MyProfilePage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/people" element={<ComingSoonPage />} />
                <Route path="/search" element={<ComingSoonPage />} />
                <Route path="/notifications" element={<ComingSoonPage />} />
                <Route path="/messages" element={<ComingSoonPage />} />
                <Route path="/settings" element={<ComingSoonPage />} />
              </Route>
            </Route>
            <Route path="*" element={<p>404-Page Not Found</p>} />
          </Routes>
        </Suspense>
      </UserAuthProvider>
    </BrowserRouter>
  )
}

export default App
