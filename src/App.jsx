/*app.jsx*/
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LoadingFallback } from './components/ui/feedback/LoadingFallback.jsx'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { DevPage } from './pages/DevPage.jsx'
import { ComingSoonPage } from './pages/ComingSoonPage.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<DevPage />} />
            <Route path="/feed" element={<ComingSoonPage feature="Feed" />} />
            <Route path="/timeline" element={<ComingSoonPage feature="Timeline" />} />
            <Route path="/people" element={<ComingSoonPage feature="People" />} />
            <Route path="/notifications" element={<ComingSoonPage feature="Notifications" />} />
            <Route path="/profile" element={<ComingSoonPage feature="Profile" />} />
            <Route path="/settings" element={<ComingSoonPage feature="Settings" />} />
            <Route path="/search" element={<ComingSoonPage feature="Search" />} />
            <Route path="/messages" element={<ComingSoonPage feature="Messages" />} />
            <Route path="/userSuggestions" element={<ComingSoonPage feature="Profile" />} />
            <Route path="*" element={<p>404-Page Not Found</p>} />
          </Routes>
        </Suspense>
      </UserAuthProvider>
    </BrowserRouter>
  )
}

export default App
