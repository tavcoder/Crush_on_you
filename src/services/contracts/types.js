/*types.js*/

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
 * @property {string[]} [interests]
 * @property {string[]} [bookmarks]
 * @property {Object} [profileDetails]
 * @property {string|null} [profileDetails.education]
 * @property {string|null} [profileDetails.drink]
 * @property {string|null} [profileDetails.languages]
 * @property {string|null} [profileDetails.smoke]
 * @property {string|null} [profileDetails.bio]
 */

/**
 * @typedef {Object} UserStats
 * @property {string} userId
 * @property {number} followersCount
 * @property {number} followingCount
 * @property {number} postsCount
 */

/**
 * @typedef {Object} PostRaw
 * @property {string} _id
 * @property {string} text
 * @property {string|UserRaw} user
 * @property {string} [file]        // nombre de fichero de imagen
 * @property {string} [created_at]
 * @property {Array<string>} [likes]
 * @property {CommentRaw[]} [comments]
 * @property {boolean} [isBookmarked]
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
 * @typedef {Object} ProfileDetails
 * @property {string|null} [education]
 * @property {string|null} [drink]
 * @property {string|null} [languages]
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
 * @property {string} email
 * @property {string|null} avatarUrl
 * @property {string|null} city
 * @property {string|null} country
 * @property {boolean} isOnline
 * @property {boolean} hasStory
 * @property {boolean} isUnseen
 * @property {FollowRelation[]} following
 * @property {FollowRelation[]} followers
 * @property {ProfileDetails} profileDetails
 * @property {string[]} interests
 * @property {string[]} bookmarks
 */


/**
 * Post enriquecido — authorId resuelto a objeto User completo
 * @typedef {Object} Post
 * @property {string} id
 * @property {string} authorId
 * @property {User|null} author
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
 * Payload usado para registrar un usuario.
 * @typedef {Object} RegisterPayload
 * @property {string} name
 * @property {string} surname
 * @property {string} nick
 * @property {string} email
 * @property {string} password
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
 * @property {LoginUserSummary} [user]
 * @property {string} [token]
 */

/**
 * Resultado normalizado devuelto por loginUser.
 * @typedef {Object} LoginResult
 * @property {string} token
 * @property {string} userId
 */

/**
 * Payload usado para actualizar el perfil del usuario.
 * @typedef {Object} UpdateProfilePayload
 * @property {string} userName
 * @property {string} userSurName
 * @property {string} userNick
 * @property {string} email
 * @property {string|null} [city]
 * @property {string|null} [country]
 * @property {string[]} [interests]
 * @property {string|null} [bio]
 * @property {string|null} [education]
 * @property {string|null} [languages]
 * @property {string|null} [smoke]
 * @property {string|null} [drink]
 */

/**
 * Credenciales usadas para iniciar sesión.
 * @typedef {Object} LoginPayload
 * @property {string} email
 * @property {string} password
 */

/**
 * Datos necesarios para crear una publicación.
 * @typedef {Object} CreatePostPayload
 * @property {string} content
 * @property {File[]} [files]
 */

/**
 * Respuesta cruda de los contadores del usuario.
 * @typedef {Object} UserCountersRaw
 * @property {string} userId
 * @property {number} following
 * @property {number} followed
 * @property {number} publications
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
 * @property {UploadFileMetadata} file
 */

/**
 * Metadatos disponibles en las subidas de Multer/Cloudinary.
 * @typedef {Object} UploadFileMetadata
 * @property {string} [fieldname]
 * @property {string} [filename]
 * @property {string} [originalname]
 * @property {string} [mimetype]
 * @property {number} [size]
 * @property {string} [path]
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
 * Documento Follow poblado con el usuario incluido.
 * @typedef {Object} PopulatedFollowRaw
 * @property {string} _id
 * @property {UserRaw} [user]
 * @property {UserRaw} [followed]
 */

/**
 * Respuesta cruda del listado de seguidores o seguidos.
 * @typedef {Object} FollowsListResponseRaw
 * @property {"success"|"error"} status
 * @property {string} [message]
 * @property {PopulatedFollowRaw[]} [follows]
 * @property {number} [total]
 * @property {number} [page]
 * @property {number} [pages]
 * @property {Array<string|{userId:string}>} [user_following]
 * @property {Array<string|{userId:string}>} [user_follow_me]
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
 * Resultado devuelto por createPost después de adaptar el post.
 * @typedef {Object} CreatePostResult
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {Post} publicationStored
 * @property {boolean} imageUploadFailed
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
 * @property {UploadFileMetadata} file
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

/**
 * @typedef {Object} ToggleBookmarkResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {boolean} isBookmarked
 */

/**
 * Comentario crudo incluido en una publicación.
 * @typedef {Object} CommentRaw
 * @property {string} _id
 * @property {string|UserRaw} user
 * @property {string} text
 * @property {string} [created_at]
 */

/**
 * @typedef {Object} AddCommentResponseRaw
 * @property {"success"|"error"} status
 * @property {string} [message]
 * @property {CommentRaw} [comment]
 */

/**
 * @typedef {Object} RemoveCommentResponseRaw
 * @property {"success"|"error"} status
 * @property {string} message
 * @property {PostRaw} [publication]
 */

/**
 * @typedef {Object} ListCommentsResponseRaw
 * @property {"success"|"error"} status
 * @property {CommentRaw[]} [comments]
 * @property {string} [message]
 */

/**
 * @typedef {Object} SearchUsersResponseRaw
 * @property {"success"|"error"} status
 * @property {string} [message]
 * @property {UserRaw[]} users
 * @property {number} page
 * @property {number} total
 * @property {number} pages
 */

/**
 * @typedef {Object} SearchPostsResponseRaw
 * @property {"success"|"error"} status
 * @property {string} [message]
 * @property {number} page
 * @property {number} total
 * @property {number} pages
 * @property {PostRaw[]} publications
 */
export { }