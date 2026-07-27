// services/api/adapters/posts.adapter.js
import { adaptUser } from './users.adapter.js';  // ← importa el adapter de usuario

/**
 * @param {import('../../contracts/types.js').PostRaw} raw
 * @param {string} [currentUserId]
 * @returns {import('../../contracts/types.js').Post}
 */
export function adaptPost(raw, currentUserId) {
    const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') ?? 'http://localhost:3900';

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
        images: raw.file
            ? [`${API_BASE}/uploads/publications/${raw.file}`]
            : [],
        stats: {
            likesCount: Array.isArray(raw.likes) ? raw.likes.length : 0,
            commentsCount: Array.isArray(raw.comments) ? raw.comments.length : 0,
            sharesCount: 0,
        },
        isLiked: Array.isArray(raw.likes) && !!currentUserId
            ? raw.likes.map(String).includes(String(currentUserId))
            : false,
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