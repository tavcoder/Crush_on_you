//SortByCard.jsx
import { SelectButton } from '../../ui/selectButton/SelectButton'
import './SortByCard.css'

// TODO: [DEUDA TÉCNICA] sortBy deshabilitado intencionalmente.
// - "following" y "latest" no son sorts reales: el endpoint /feed ya está
//   scopeado a following y ordenado por -created_at por defecto
//   (backend/controllers/publication.js). Seleccionarlos no cambiaría nada
//   respecto al estado inicial.
// - "popular" requeriría soporte real de backend (agregación por
//   likes.length), que no existe hoy. No se resuelve en frontend para no
//   romper la paginación de useInfiniteQuery entre páginas.
// Se mantiene visible  disabled (no se elimina el componente) como decisión
// consciente de UX: comunica que la feature fue evaluada y pausada, no rota.
// Resolución: implementar agregación por popularidad en backend/controllers/
// publication.js cuando se priorice esta feature
export function SortByCard({ onChange, disabled }) {
    const selectOptions = [
        { value: "following", label: "Following", icon: undefined },
        { value: "latest", label: "Latest", icon: undefined },
        { value: "popular", label: "Popular", icon: undefined }
    ];
    return (
        <section className="card sort-by-card" aria-label="Sort posts">
            <h2 className='sort-by-card__title'>Sort By</h2>
            <SelectButton
                label="following"
                name="sortBy"
                options={selectOptions}
                onChange={onChange}
                disabled={disabled}
                tooltip={disabled ? "Coming soon" : undefined}
                className="sort-by-card__select"
            />
        </section>
    )
}