/*Pagination.jsx*/
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RoundButton } from '../roundButton/RoundButton.jsx'

/**
 * Controles de paginación simple (anterior/siguiente) para listas que usan
 * useQuery en lugar de useInfiniteQuery. Reutilizable en cualquier lista
 * paginada tradicional (followers, following, suggestions, etc.).
 *
 * No renderiza nada si solo existe una página — no hay nada que navegar.
 *
 * @param {Object} props
 * @param {{ currentPage: number, totalPages: number }} props.pagination
 * @param {(newPage: number) => void} props.onPageChange
 */
export function Pagination({ pagination, onPageChange }) {

    const { currentPage, totalPages } = pagination ?? {}
    if (!totalPages || totalPages <= 1) return null
    const hasPrevious = currentPage > 1
    const hasNext = currentPage < totalPages

    return (
        <div className="pagination">
            {hasPrevious && (
                <RoundButton
                    onClick={() => onPageChange(currentPage - 1)}
                    buttonSize="md"
                    buttonText={<ChevronLeft />}
                    ariaLabel={"Previous page"}
                />
            )}
            {hasNext && (
                <RoundButton
                    onClick={() => onPageChange(currentPage + 1)}
                    buttonSize="md"
                    buttonText={<ChevronRight />}
                    ariaLabel={"Next page"}
                />
            )}
        </div>
    )
}
