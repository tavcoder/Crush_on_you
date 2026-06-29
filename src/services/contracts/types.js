// services/contracts/types.js

// ========================================
// PRIMITIVES — building blocks
// ========================================

/**
 * @typedef {Object} PostStats
 * @property {number} likesCount
 * @property {number} commentsCount
 * @property {number} sharesCount
 */

/**
 * @typedef {Object} Interest
 * @property {string} id
 * @property {string} label
 */

/**
 * @typedef {Object} ProfileDetails
 * @property {string} [education]
 * @property {string} [drink]
 * @property {string} [languages]
 * @property {string} [marijuana]
 * @property {string} [smoke]
 * @property {string} [bio]
 */

/**
 * @typedef {Object} FollowRelation
 * @property {string} userId
 */

/**
 * @typedef {Object} Pagination
 * @property {number} currentPage
 * @property {number} totalPages
 */

// ========================================
// DOMAIN — raw shapes from the data source
// ========================================

/**
 * @typedef {Object} UserRaw
 * @property {string} id
 * @property {string} userName
 * @property {string} userSurName
 * @property {string} userNick
 * @property {string} email
 * @property {string} password
 * @property {string|null} avatarUrl
 * @property {string|null} city
 * @property {string|null} country
 * @property {boolean} isOnline
 * @property {boolean} hasStory
 * @property {boolean} isUnseen
 * @property {FollowRelation[]} following
 * @property {FollowRelation[]} followers
 * @property {ProfileDetails} profileDetails
 * @property {Interest[]} interests
 */

// ========================================
// APP CONTRACTS
// ========================================

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} userName
 * @property {string} userSurName
 * @property {string} userNick
 * @property {string|null} avatarUrl
 * @property {boolean} isOnline
 * @property {boolean} hasStory
 * @property {boolean} isUnseen
 * @property {FollowRelation[]} following
 * @property {FollowRelation[]} followers
 * @property {ProfileDetails} profileDetails
 * @property {Interest[]} interests
 */

/**
 * Post enriquecido — authorId resuelto a objeto User completo
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} authorId
 * @property {User} author
 * @property {string} content
 * @property {string[]} images
 * @property {PostStats} stats
 * @property {boolean} isLiked
 * @property {boolean} isBookmarked
 * @property {string} createdAt
 */

// ========================================
// RESPONSE ENVELOPES
// ========================================

/**
 * @typedef {Object} PaginatedPosts
 * @property {Post[]} data
 * @property {Pagination} pagination
 */

/**
 * @typedef {Object} ApiSuccess
 * @property {'success'} status
 * @property {*} [data]
 */

export { }