/**
 * Escapa caracteres especiales de regex en un string, para poder
 * usarlo de forma segura como texto literal dentro de una expresión regular.
 *
 * @param {string} string - Texto a escapar
 * @returns {string} Texto con los caracteres especiales de regex escapados
 */
export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}