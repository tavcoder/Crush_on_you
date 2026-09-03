const User = require("../models/user");

/**
 * Devuelve un Set con los ids (como string) de las publicaciones
 * que el usuario tiene guardadas. Pensado para chequeos O(1) con .has()
 * al recorrer una lista de publicaciones.
 *
 * @param {string} userId
 * @returns {Promise<Set<string>>}
 */
const getUserBookmarkSet = async (userId) => {
    const user = await User.findById(userId).select('bookmarks');
    if (!user || !user.bookmarks) return new Set();
    return new Set(user.bookmarks.map(id => id.toString()));
}

module.exports = {
    getUserBookmarkSet
}