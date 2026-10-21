// components/ui/feedback/ErrorFallback.jsx
import { ApiError,isConnectionError } from '../../../services/ApiError.js'
import { Button } from '../button/Button.jsx'
import './ErrorFallback.css'

// Errores del navegador al cargar chunks lazy: no son ApiError y no traen code.
// Chrome, Firefox, Safari y Vite usan textos distintos; este es el único sitio que los reconoce.
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Unable to preload CSS/i

function getErrorInfo(error) {
    if (error instanceof ApiError) return { kind: 'api', message: error.message }
    if (CHUNK_ERROR.test(error?.message ?? ''))
        return { kind: 'chunk', message: "Couldn't load this page. Check your connection and try again." }
    return { kind: 'unknown', message: 'Something went wrong. Please try again.' }
}

export function ErrorFallback({ error, resetErrorBoundary, onRetry, compact = false }) {
    const { kind, message } = getErrorInfo(error)
    // Un chunk fallido no se recupera reseteando el boundary: se recarga la página
    const retry = kind === 'chunk' ? () => window.location.reload() : (onRetry ?? resetErrorBoundary)
    if (compact && isConnectionError(error)) {
        return (
            <p className="error-state error-state--compact">
                Unavailable right now
            </p>
        )
    }
    return (
        <div role="alert" className="error-state">
            <p className="error-state__message">{message}</p>
            {retry && <Button type="button" onClick={retry}>Try again</Button>}
        </div>
    )
}