// services/api/adapters/follows.adapter.js
import { adaptUser } from './users.adapter.js';

const POPULATED_FIELD_BY_TYPE = {
    followers: 'user',
    following: 'followed',
};

/**
 * Adapta una respuesta paginada de relaciones de seguimiento (followers o following)
 * a la forma estándar de lista paginada, con cada elemento ya adaptado como User.
 *
 * ⚠️ El backend devuelve `follows[]` — documentos Follow crudos, no usuarios.
 * El usuario completo viene poblado en un campo distinto según el tipo de
 * consulta: `.user` para followers, `.followed` para following. Este mapeo
 * es un detalle de implementación del backend — el resto de la app solo
 * conoce 'followers' | 'following', nunca los nombres de campo reales.
 *
 * ⚠️ Cuando no hay resultados, el backend responde SIN los campos de
 * paginación (sin `follows`, `total`, `page`, `pages` — ver
 * controllers/follow.js, rama `if (!follows || follows.length === 0)`).
 * Este adapter trata esa ausencia como lista vacía en vez de asumir que
 * el backend siempre manda la forma completa.
 *
 * @param {Object} response
 * @param {'followers' | 'following'} type
 * @returns {import('../../contracts/types.js').PaginatedUsers}
 */
export function adaptFollowList(response, type) {
    const safeResponse = response ?? {};
    const populatedField = POPULATED_FIELD_BY_TYPE[type];

    if (!populatedField) {
        console.warn(`adaptFollowList: tipo inválido "${type}", se esperaba 'followers' o 'following'`);
        return { data: [], pagination: { currentPage: 1, totalPages: 1 } };
    }

    return {
        data: Array.isArray(safeResponse.follows)
            ? safeResponse.follows
                .map(follow => adaptUser(follow[populatedField]))
                .filter(Boolean)
            : [],
        pagination: {
            currentPage: safeResponse.page ?? 1,
            totalPages: safeResponse.pages ?? 1,
        }
    };
}