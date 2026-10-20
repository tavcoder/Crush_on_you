// components/ui/feedback/ConnectionBanner.jsx
import { useQueryClient } from '@tanstack/react-query'
import { useConnectionStatus } from '../../../hooks/useConnectionStatus.js'
import { ERROR_MESSAGES } from '../../../services/ApiError.js'
import { Button } from '../button/Button.jsx'
import './ConnectionBanner.css'

export function ConnectionBanner() {
    const status = useConnectionStatus()
    const queryClient = useQueryClient()
    if (status === 'ok') return null

    return (
        <div role="status" className={`connection-banner connection-banner--${status}`}>
            <p className="connection-banner__text">{ERROR_MESSAGES[status === 'offline' ? 'NETWORK' : 'SERVER']}</p>
            <Button type="button"
                onClick={() => queryClient.refetchQueries({ type: 'active' })}>
                Try again
            </Button>
        </div>
    )
}