//SortByCard.jsx
import { SelectButton } from '../../ui/selectButton/SelectButton'
import './SortByCard.css'

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