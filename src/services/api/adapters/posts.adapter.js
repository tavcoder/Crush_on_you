// services/api/adapters/posts.adapter.js

/**
 * @param {import('../../contracts/types.js').PostRaw} raw
 * @returns {import('../../contracts/types.js').Post}
 */
export function adaptPost(raw) {
    if (!raw || typeof raw !== 'object') {
        console.warn('adaptPost: recibió valor inválido', raw);
        return null;
    }

    return {
        id: raw.id ?? '',
        authorId: raw.authorId ?? '',
        content: raw.content ?? '',
        images: Array.isArray(raw.images) ? raw.images : [],
        stats: {
            likesCount: raw.stats?.likesCount ?? 0,
            commentsCount: raw.stats?.commentsCount ?? 0,
            sharesCount: raw.stats?.sharesCount ?? 0,
        },
        profileDetails: raw.profileDetails ?? null,
        isLiked: raw.isLiked ?? false,
        isBookmarked: raw.isBookmarked ?? false,
        createdAt: raw.createdAt ?? new Date().toISOString(),
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
export function adaptPostList(response) {
    const safeResponse = response ?? {};

    return {
        data: Array.isArray(safeResponse.data)
            ? safeResponse.data.map(adaptPost).filter(Boolean)
            : [],
        pagination: {
            currentPage: safeResponse.pagination?.currentPage ?? 1,
            totalPages: safeResponse.pagination?.totalPages ?? 1,
        }
    };
}