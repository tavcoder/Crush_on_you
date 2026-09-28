/**
 * Constructores de rutas de perfil. Convención única: sin userId = usuario
 * logueado, con userId = perfil ajeno.
 * @param {string} [userId]
 */
export const getTimelinePath = (userId) =>
    userId ? `/timeline/${userId}` : '/timeline';

/**
 * @param {'followers' | 'following' | 'suggestions'} type
 * @param {string} [userId]
 */
export const getPeoplePath = (type, userId) =>
    userId ? `/people/${type}/${userId}` : `/people/${type}`;