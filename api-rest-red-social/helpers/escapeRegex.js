// helpers/escapeRegex.js
// Escapa los caracteres con significado especial en una expresión regular,
// para que una búsqueda como "C++" se trate como texto literal.
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = escapeRegex;