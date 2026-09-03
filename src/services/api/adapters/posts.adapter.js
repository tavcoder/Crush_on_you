// services/api/adapters/posts.adapter.js
import { adaptUser } from './users.adapter.js';  // ← importa el adapter de usuario

/**
 * @param {import('../../contracts/types.js').PostRaw} raw
 * @param {string} [currentUserId]
 * @returns {import('../../contracts/types.js').Post}
 */
export function adaptPost(raw, currentUserId) {

    if (!raw || typeof raw !== 'object') {
        console.warn('adaptPost: recibió valor inválido', raw);
        return null;
    }

    // ✅ ADAPTA EL AUTOR — ahora siempre tendrá formato { id, userName, avatarUrl, ... }
    const author = raw.user ? adaptUser(raw.user) : null;

    return {
        id: raw._id ?? '',
        authorId: author?.id ?? raw.user?._id ?? '',
        author,  // ← adaptado, no crudo
        content: raw.text ?? '',
        images: raw.file ? [raw.file] : [],
        stats: {
            likesCount: Array.isArray(raw.likes) ? raw.likes.length : 0,
            commentsCount: Array.isArray(raw.comments) ? raw.comments.length : 0,
            sharesCount: 0,
        },
        // ⚠️ currentUserId es OBLIGATORIO recibirlo como parámetro — el backend
        // no calcula isLiked. raw.likes es la lista de IDs de TODOS los usuarios
        // que dieron like (dato del post, no de la sesión). Para saber si
        // el usuario actual dio like, hay que buscarlo en esa lista aquí.
        // Si algún hook consumidor no pasa currentUserId, isLiked cae
        // silenciosamente en `false` para todos los posts (bug ya visto
        // en useUserPosts — TODO CERRADO).
        isLiked: Array.isArray(raw.likes) && !!currentUserId
            ? raw.likes.map(String).includes(String(currentUserId))
            : false,
        // isBookmarked ya viene calculado por el backend (bookmarkService.getUserBookmarkSet
        // aplicado en feed/user/search) — no se recalcula en frontend.
        isBookmarked: !!raw.isBookmarked,
        createdAt: raw.created_at ?? new Date().toISOString(),
    };
}

/**
 * Adapta una respuesta paginada de la API
 * @param {Object} response
 * @param {import('../../contracts/types.js').PostRaw[]} response.data
 * @param {Object} [response.pagination]
 * @param {number} [response.pagination.currentPage]
 * @param {number} [response.pagination.totalPages]
 * @param {string} [currentUserId]
 * @returns {import('../../contracts/types.js').PaginatedPosts}
 */
export function adaptPostList(response, currentUserId) {
    const safeResponse = response ?? {};
    return {
        data: Array.isArray(safeResponse.publications)
            ? safeResponse.publications.map(p => adaptPost(p, currentUserId)).filter(Boolean)
            : [],
        pagination: {
            currentPage: safeResponse.page ?? 1,
            totalPages: safeResponse.pages ?? 1,
        }
    };
}