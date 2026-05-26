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
 * @typedef {Object} ProfileDetails
 * @property {string} education
 * @property {string} drink
 * @property {string} languages
 * @property {string} marijuana
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
// These match what mockClient / API returns
// before any transformation
// ========================================

/**
 * @typedef {Object} UserRaw
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
 */

/**
 * @typedef {Object} PostRaw
 * @property {string} id
 * @property {string} authorId
 * @property {string} content
 * @property {string[]} images
 * @property {PostStats} stats
 * @property {ProfileDetails} [profileDetails]
 * @property {boolean} isLiked
 * @property {boolean} isBookmarked
 * @property {string} createdAt          - ISO 8601
 */

// ========================================
// APP CONTRACTS — what the app works with
// Produced by adapters, consumed by hooks/components
// Never import PostRaw outside adapters
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
 */

/**
 * Post enriquecido — authorId resuelto a objeto User completo
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} authorId
 * @property {User} author            - resuelto por enrichPostsWithUserData
 * @property {string} content
 * @property {string[]} images
 * @property {PostStats} stats
 * @property {ProfileDetails} [profileDetails]
 * @property {boolean} isLiked
 * @property {boolean} isBookmarked
 * @property {string} createdAt
 */

// ========================================
// RESPONSE ENVELOPES — shapes from api/*.api.js
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