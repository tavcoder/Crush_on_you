/*app.jsx*/
import { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { LoadingFallback } from './components/feedback/LoadingFallback.jsx'
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Suspense fallback={LoadingFallback}>
        <Routes>
          <Route path="*" element={<p>404-Page Not Found</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
