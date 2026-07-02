// components/molecules/interestList/InterestList.jsx
import { IconButton } from '../../ui/iconButton/IconButton.jsx';
import './InterestList.css';

/**
 * @param {Object} props
 *@param {{ id: string, label: string }[]} props.options
 * @param {string[]} props.selected - labels seleccionados
 * @param {number} props.maxSelection - labels máximos a seleccionar
 * @param {function(string): void} props.onToggle - handler al hacer click
 */

export function InterestList({
    options,
    selectedValues,
    onToggle,
    maxSelection = 8
}) {
    const canAddMore = selectedValues.length < maxSelection;

    return (
        <div className="interest-list" role="group" aria-label="Interests">
            {options.map((option) => {
                const isActive = selectedValues.includes(option.label);
                const isDisabled = !isActive && !canAddMore;

                return (
                    <IconButton
                        key={option.id}
                        type="button"
                        variant={isActive ? 'filled' : 'outlined'}
                        size="sm"
                        disabled={isDisabled}
                        ariaLabel={isActive ? `Remove ${option.label}` : `Add ${option.label}`}
                        role="checkbox"
                        aria-checked={isActive}
                        onClick={() => onToggle(option.id)}
                        className={`interest-chip ${isActive ? 'interest-chip--active' : ''}`}
                    >
                        {option.label}
                    </IconButton>
                );
            })}
        </div>
    );
}