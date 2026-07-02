// services/api/adapters/users.adapter.js

function normalizeFollowItem(item) {
    if (typeof item === 'string') return { userId: item };
    if (item && typeof item === 'object' && typeof item.userId === 'string') {
        return item;
    }
    return null;
}

/**
 * @param {import('../../contracts/types.js').UserRaw} raw
 * @returns {import('../../contracts/types.js').User}
 */
export function adaptUser(raw) {
    if (!raw || typeof raw !== 'object') {
        console.warn('adaptUser: recibió valor inválido', raw);
        return null;
    }

    const following = Array.isArray(raw.following)
        ? raw.following.map(normalizeFollowItem).filter(Boolean)
        : [];

    const followers = Array.isArray(raw.followers)
        ? raw.followers.map(normalizeFollowItem).filter(Boolean)
        : [];

    const interests = Array.isArray(raw.interests)
        ? raw.interests.filter(item => item && typeof item === 'object' && item.id && item.label)
        : [];

    const profileDetails = raw.profileDetails && typeof raw.profileDetails === 'object'
        ? {
            education: raw.profileDetails.education ?? null,
            drink: raw.profileDetails.drink ?? null,
            languages: raw.profileDetails.languages ?? null,
            marijuana: raw.profileDetails.marijuana ?? null,
            smoke: raw.profileDetails.smoke ?? null,
            bio: raw.profileDetails.bio ?? null,
        }
        : {
            education: null,
            drink: null,
            languages: null,
            marijuana: null,
            smoke: null,
            bio: null,
        };

    return {
        id: raw.id ?? '',
        userName: raw.userName ?? '',
        userSurName: raw.userSurName ?? '',
        userNick: raw.userNick ?? '',
        avatarUrl: raw.avatarUrl ?? null,
        city: raw.city ?? null,
        country: raw.country ?? null,
        isOnline: raw.isOnline ?? false,
        hasStory: raw.hasStory ?? false,
        isUnseen: raw.isUnseen ?? false,
        following,
        followers,
        interests,
        profileDetails,
    };
}

/**
 * Adapta una respuesta paginada de la API
 * @param {Object} response
 * @param {import('../../contracts/types.js').UserRaw[]} response.data
 * @param {Object} [response.pagination]
 * @param {number} [response.pagination.currentPage]
 * @param {number} [response.pagination.totalPages]
 * @returns {import('../../contracts/types.js').PaginatedUsers}
 */
export function adaptUserList(response) {
    const safeResponse = response ?? {};

    return {
        data: Array.isArray(safeResponse.data)
            ? safeResponse.data.map(adaptUser).filter(Boolean)
            : [],
        pagination: {
            currentPage: safeResponse.pagination?.currentPage ?? 1,
            totalPages: safeResponse.pagination?.totalPages ?? 1,
        }
    };
}