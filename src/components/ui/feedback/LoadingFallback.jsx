// components/ui/feedback/LoadingFallback.jsx
import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import './LoadingFallback.css'

// El último mensaje es el que se queda si la carga se alarga
const DEFAULT_MESSAGES = [
    'Ready to find your match?',
    'Warming up the butterflies…',
    'Hold on, almost there…',
]
const ROTATION_MS = 2500

export function LoadingFallback({ label = 'Loading…', messages = DEFAULT_MESSAGES }) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (messages.length < 2) return
        const id = setInterval(() => {
            setIndex(i => Math.min(i + 1, messages.length - 1))
        }, ROTATION_MS)
        return () => clearInterval(id)
    }, [messages.length])

    return (
        <div className="loading-fallback" role="status">
            <Heart className="loading-fallback__icon" size={32} fill="currentColor" aria-hidden="true" />
            {/* key reinicia la animación de entrada en cada mensaje */}
            <p className="loading-fallback__text" key={index} aria-hidden="true">
                {messages[index]}
            </p>
            <span className="sr-only">{label}</span>
        </div>
    )
}