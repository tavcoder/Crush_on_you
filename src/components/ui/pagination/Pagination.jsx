/*components/ui/pagination/Pagination.jsx*/
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RoundButton } from '../roundButton/RoundButton.jsx'
import './Pagination.css'

export function Pagination({ pagination, onPageChange }) {
    const { currentPage, totalPages } = pagination ?? {}
    if (!totalPages || totalPages <= 1) return null

    const hasPrevious = currentPage > 1
    const hasNext = currentPage < totalPages

    return (
        <nav className="pagination" aria-label="Pagination">
            <RoundButton
                onClick={() => onPageChange(currentPage - 1)}
                buttonSize="md"
                buttonText={<ChevronLeft />}
                ariaLabel="Previous page"
                disabled={!hasPrevious}
            />
            <p className="pagination__status" aria-live="polite">
                Page {currentPage} of {totalPages}
            </p>
            <RoundButton
                onClick={() => onPageChange(currentPage + 1)}
                buttonSize="md"
                buttonText={<ChevronRight />}
                ariaLabel="Next page"
                disabled={!hasNext}
            />
        </nav>
    )
}