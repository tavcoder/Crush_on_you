// components/molecules/searchBar/SearchBar.jsx
import { useId } from 'react'
import { Input } from '../../ui/input/Input.jsx'
import { useSearchQuery } from '../../../hooks/useSearchQuery.js'

export function SearchBar({ className = '' }) {
    const id = useId()
    const { query, setQuery, clearQuery } = useSearchQuery()

    return (
        <form role="search" aria-label="Search posts" className={className}
            onSubmit={(e) => e.preventDefault()}>
            <Input
                variant="icon"
                id={id}
                label="Search"
                placeholder="Search people, posts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onClear={clearQuery}
            />
        </form>
    )
}