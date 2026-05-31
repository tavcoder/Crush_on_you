/*ErrorFallback.jsx*/

export function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert" >
            <p>{error?.message ?? "Something went wrong"}</p>
            <button type="button" onClick={resetErrorBoundary}>
                Try Again
            </button>
        </div>)
}