/*app.jsx*/
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LoadingFallback } from './components/ui/feedback/LoadingFallback.jsx'
import { UserAuthProvider } from './context/UserAuthContext.jsx'
import { DevPage } from './pages/DevPage.jsx'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <UserAuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<DevPage />} />
            <Route path="*" element={<p>404-Page Not Found</p>} />
          </Routes>
        </Suspense>
      </UserAuthProvider>
    </BrowserRouter>
  )
}

export default App
