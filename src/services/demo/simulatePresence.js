// services/demo/simulatePresence.js
// Solo para grabar la demo: el backend no soporta presencia.
const isDemoOnline = (id) =>
    [...id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 3 !== 0

// Recorre la respuesta y añade isOnline a todo objeto con forma de usuario
// crudo (_id + nick) que no lo traiga. No toca nada más.
export function simulatePresence(data) {
    if (Array.isArray(data)) return data.map(simulatePresence)
    if (data && typeof data === 'object') {
        const out = Object.fromEntries(
            Object.entries(data).map(([k, v]) => [k, simulatePresence(v)])
        )
        if (typeof out._id === 'string' && typeof out.nick === 'string' && out.isOnline === undefined) {
            out.isOnline = isDemoOnline(out._id)
        }
        return out
    }
    return data
}