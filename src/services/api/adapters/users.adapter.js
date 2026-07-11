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
        ? raw.interests.filter(id => typeof id === 'string')
        : [];

    const profileDetails = raw.profileDetails && typeof raw.profileDetails === 'object'
        ? {
            bio: raw.profileDetails.bio ?? null,
            education: raw.profileDetails.education ?? null,
            languages: raw.profileDetails.languages ?? null,
            smoke: raw.profileDetails.smoke ?? null,
            drink: raw.profileDetails.drink ?? null,
        }
        : {
            bio: null,
            education: null,
            languages: null,
            smoke: null,
            drink: null,
        };

    return {
        id: raw._id ?? '',
        userName: raw.name ?? '',
        userSurName: raw.surname ?? '',
        userNick: raw.nick ?? '',
        email: raw.email ?? '',
        avatarUrl: raw.image ?? null,
        city: raw.city ?? null,
        country: raw.country ?? null,
        // TODO: [DEUDA TÉCNICA] isOnline requiere sistema de presencia en tiempo real
        // (WebSockets o lastActiveAt). Backend actual no lo soporta; siempre false.
        isOnline: raw.isOnline ?? false,

        // TODO: [DEUDA TÉCNICA] hasStory requiere modelo Story en backend
        // (crear/consultar stories no expiradas). No implementado; siempre false.
        hasStory: raw.hasStory ?? false,
        isUnseen: raw.isUnseen ?? false,
        following,
        followers,
        interests,
        profileDetails,
    };
}

/**
 * @param {import('../contracts/types.js').UsersListResponseRaw} response
 * @returns {import('../contracts/types.js').PaginatedUsers}
 */

export function adaptUserList(response) {
    const safeResponse = response ?? {};

    return {
        data: Array.isArray(safeResponse.users)
            ? safeResponse.users.map(adaptUser).filter(Boolean)
            : [],
        pagination: {
            currentPage: safeResponse.page ?? 1,
            totalPages: safeResponse.pages ?? 1,
        }
    };
}