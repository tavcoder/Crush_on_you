/**
* @typedef {Object} UserData      
 * @property {string} userId
 * @property {string} userName
 * @property {string} userSurName
 * @property {string} userNick
 * @property {string|null} avatarUrl
 * @property {boolean} isOnline
 */
/**
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} authorId
 * @property {string} content
 * @property {string[]} images
 * @property {PostStats} stats
 * @property {ProfileDetails} profileDetails
 * @property {boolean} isLiked
 * @property {boolean} isBookmarked
 * @property {string} createdAt
 */

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
