/*SearchBar.jsx*/
import { forwardRef, useId } from 'react'
import { Input } from '../../ui/input/Input.jsx'
import { CloseButton } from '../../ui/closeButton/CloseButton.jsx'
import { useSearchQuery } from '../../../hooks/useSearchQuery.js'

export const SearchBar = forwardRef(function SearchBar({ className = '', onClose }, ref) {
    const id = useId()
    const { query, setQuery, clearQuery } = useSearchQuery()

    return (
        <form role="search" aria-label="Search posts" className={className}
            onSubmit={(e) => e.preventDefault()}>
            <Input
                ref={ref}
                variant="icon"
                id={id}
                label="Search"
                placeholder="Search people, posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={clearQuery}
            />
            {onClose && <CloseButton ariaLabel="Close search" onClick={onClose} />}
        </form>
    )
})