// services/api/adapters/posts.adapter.js

/**
 * @param {import('../../contracts/types.js').PostRaw} raw
 * @returns {import('../../contracts/types.js').Post}
 */
export function adaptPost(raw, currentUserId) {
    if (!raw || typeof raw !== 'object') {
        console.warn('adaptPost: recibió valor inválido', raw);
        return null;
    }

    return {
        id: raw._id ?? '',
        authorId: raw.user?._id ?? raw.user ?? '',
        author: raw.user ?? null,
        content: raw.text ?? '',
        images: raw.file ? [raw.file] : [],
        stats: {
            likesCount: Array.isArray(raw.likes) ? raw.likes.length : 0,
            commentsCount: Array.isArray(raw.comments) ? raw.comments.length : 0,
            sharesCount: 0,
        },
        isLiked: Array.isArray(raw.likes) && !!currentUserId
            ? raw.likes.map(String).includes(String(currentUserId))
            : false,
        isBookmarked: false,
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