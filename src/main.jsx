/*main.jsx*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorFallback } from './components/feedback/ErrorFallback.jsx'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient();

function AppSetup() {
  return (
    <StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>
  )
}
createRoot(document.getElementById('root')).render(<AppSetup />);
