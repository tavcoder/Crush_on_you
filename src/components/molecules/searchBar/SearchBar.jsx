/*SearchBar.jsx*/
import { useRef, useEffect, useId } from 'react'
import { Input } from '../../ui/input/Input.jsx'
import { useSearchQuery } from '../../../hooks/useSearchQuery.js'

const COPY = {
    posts: { label: 'Search posts', placeholder: 'Search posts...' },
    users: { label: 'Search people', placeholder: 'Search people...' },
}
export function SearchBar({ className = '', onClose, mode = 'posts' }) {
    const id = useId()
    const { query, setQuery, clearQuery } = useSearchQuery()
    const inputRef = useRef(null)

    const { label, placeholder } = COPY[mode]

    useEffect(() => {
        inputRef.current?.focus()
    }, [])
    return (
        <form role="search" aria-label={label} className={className} onKeyDown={(e) => { if (e.key === 'Escape') onClose?.() }}
            onSubmit={(e) => e.preventDefault()}>
            <Input
                ref={inputRef}
                variant="icon"
                id={id}
                label="Search"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={clearQuery}

            />
        </form>
    )
}