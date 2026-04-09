/*EmptyStates.jsx*/
export function EmptyStates({ content, onClick, buttonText }) {
    return (
        <div role="status" className='empty-state'>
            <p>{content}</p>
            {onClick && <button type="button" onClick={onClick}>
                {buttonText}
            </button>}
        </div>)
}