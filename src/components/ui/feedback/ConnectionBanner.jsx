// components/ui/feedback/ConnectionBanner.jsx
import { useConnectionStatus } from '../../../hooks/useConnectionStatus.js'
import { useRetryAll } from '../../../hooks/useRetryAll.js'
import { ERROR_MESSAGES } from '../../../services/ApiError.js'
import { Button } from '../button/Button.jsx'
import './ConnectionBanner.css'

export function ConnectionBanner() {
    const status = useConnectionStatus()
    const retryAll = useRetryAll()

    if (status === 'ok') return null

    return (
        <div role="status" className={`connection-banner connection-banner--${status}`}>
            <p className="connection-banner__text">{ERROR_MESSAGES[status === 'offline' ? 'NETWORK' : 'SERVER']}</p>
            <Button type="button"
                onClick={() => retryAll()}>
                Try again
            </Button>
        </div>
    )
}