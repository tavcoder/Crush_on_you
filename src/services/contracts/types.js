// services/contracts/types.js

// ========================================
// RAW — tal y como viene de la API (backend)
// ========================================

/**
 * @typedef {Object} UserRaw
 * @property {string} _id
 * @property {string} name
 * @property {string} surname
 * @property {string} nick
 * @property {string} [email]
 * @property {string|null} [image]
 * @property {string|null} [city]
 * @property {string|null} [country]
 * @property {boolean} [isOnline]
 * @property {boolean} [hasStory]
 * @property {boolean} [isUnseen]
 * @property {Array<string|{userId:string}>} [following]
 * @property {Array<string|{userId:string}>} [followers]
 * @property {Array<{id:string,label:string}>} [interests]
 * @property {Object} [profileDetails]
 * @property {string|null} [profileDetails.education]
 * @property {string|null} [profileDetails.drink]
 * @property {string|null} [profileDetails.languages]
 * @property {string|null} [profileDetails.marijuana]
 * @property {string|null} [profileDetails.smoke]
 * @property {string|null} [profileDetails.bio]
 */

/**
 * @typedef {Object} PostRaw
 * @property {string} _id
 * @property {string} text
 * @property {string} user          // id del autor
 * @property {string} [file]        // nombre de fichero de imagen
 * @property {string} [created_at]
 * @property {Array<string>} [likes]
 * @property {Array<Object>} [comments]
 */

// ========================================
//  Usuario adaptado al dominio frontend (User)
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
 * @property {string|null} [education]
 * @property {string|null} [drink]
 * @property {string|null} [languages]
 * @property {string|null} [marijuana]
 * @property {string|null} [smoke]
 * @property {string|null} [bio]
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
// DOMAIN — modelo de usuario que usa el frontend
// ========================================

/**
 @typedef {Object} User
 * @property {string} id
 * @property {string} userName
 * @property {string} userSurName
 * @property {string} userNick
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
 * @typedef {Object} PaginatedUsers
 * @property {User[]} data
 * @property {Pagination} pagination
 */

/**
 * @typedef {Object} RegisterResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {UserRaw} [user]
 */

/**
 * @typedef {Object} LoginUserSummary
 * @property {string} id
 * @property {string} name
 * @property {string} nick
 */

/**
 * @typedef {Object} LoginResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {LoginUserSummary} user
 * @property {string} token
 */

/**
 * @typedef {Object} UserProfileResponseRaw
 * @property {"success"|"error"} status
 * @property {UserRaw} user
 * @property {Array<string|{userId:string}>} following
 * @property {Array<string|{userId:string}>} follower
 */

/**
 * @typedef {Object} UsersListResponseRaw
 * @property {"success"|"error"} status
 * @property {UserRaw[]} users
 * @property {number} page
 * @property {number} itemsPerPage
 * @property {number} total
 * @property {number} pages
 * @property {Array<string|{userId:string}>} user_following
 * @property {Array<string|{userId:string}>} user_follow_me
 */

/**
 * @typedef {Object} UpdateUserResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {UserRaw} user
 */

/**
 * @typedef {Object} UploadAvatarResponseRaw
 * @property {"success"|"error"} status
 * @property {UserRaw} user
 * @property {Object} file
 * @property {string} file.filename
 * @property {string} file.originalname
 */

/**
 * @typedef {Object} FollowRaw
 * @property {string} _id
 * @property {string} user      // id del que sigue
 * @property {string} followed  // id del seguido
 */

/**
 * @typedef {Object} SaveFollowResponseRaw
 * @property {"success"|"error"} status
 * @property {Object} [identity]   // usuario autenticado (req.user)
 * @property {FollowRaw} [follow]  // relación de follow creada
 * @property {string} [message]
 */

/**
 * @typedef {Object} UnfollowResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 */

//POST//

/**
 * @typedef {Object} PaginatedPosts
 * @property {Post[]} data
 * @property {Pagination} pagination
 */

/**
 * @typedef {Object} CreatePostResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {PostRaw} publicationStored
 */

/**
 * @typedef {Object} PostDetailResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {PostRaw} publication
 */

/**
 * @typedef {Object} DeletePostResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {string} publication   // id borrado
 */

/**
 * @typedef {Object} PostsByUserResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {number} page
 * @property {number} total
 * @property {number} pages
 * @property {PostRaw[]} publications
 */

/**
 * @typedef {Object} UploadPostImageResponseRaw
 * @property {"success"|"error"} status
 * @property {PostRaw} publication
 * @property {Object} file
 * @property {string} file.filename
 * @property {string} file.originalname
 */

/**
 * @typedef {Object} FeedResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {Array<string|{userId:string}>} following
 * @property {number} total
 * @property {number} page
 * @property {number} pages
 * @property {PostRaw[]} publications
 */

/**
 * @typedef {Object} ToggleLikeResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {number} likesCount
 */
export { }