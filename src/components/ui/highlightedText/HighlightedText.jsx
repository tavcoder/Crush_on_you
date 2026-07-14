import { escapeRegExp } from '../../../utils/textUtils.js'
import './HighlightedText.css'
/**
 * Renderiza texto con las coincidencias de `query` resaltadas dentro de un <mark>.
 * Comparación insensible a mayúsculas/minúsculas. Si `query` está vacío,
 * devuelve el texto sin ninguna transformación.
 *
 * @param {Object} props
 * @param {string} props.text - Texto completo a renderizar
 * @param {string} props.query - Término de búsqueda a resaltar dentro de `text`
 * @returns {JSX.Element}
 */
export function HighlightedText({ text, query }) {
    if (!query || !query.trim()) {
        return <>{text}</>
    }

    const escapedQuery = escapeRegExp(query.trim())
    const splitRegex = new RegExp(`(${escapedQuery})`, 'gi')   // para dividir el texto
    const testRegex = new RegExp(`^${escapedQuery}$`, 'i')     // para comprobar cada fragmento, SIN 'g'

    const parts = text.split(splitRegex)

    return (
        <>
            {parts.map((part, i) =>
                testRegex.test(part)
                    ? <mark className="highlighted-text" key={i}>{part}</mark>
                    : <span  key={i}>{part}</span>
            )}
        </>
    )
}