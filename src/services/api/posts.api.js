// posts.api.js
import { apiClient } from '../apiClient'
import { adaptPost, adaptPostList } from './adapters/posts.adapter'

/**
 * @param {{ page?: number }} [params]
 * @param {string} [currentUserId]
 * @returns {Promise<import('../contracts/types.js').PaginatedPosts>}
 */
export const getPosts = ({ page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/feed/${page}`)
        .then(res => adaptPostList(res, currentUserId))

/**
* @param {string} id
* @param {string} [currentUserId]
* @returns {Promise<import('../contracts/types.js').Post>}
*/
export const getPost = (id, currentUserId) =>
    apiClient.get(`publication/detail/${id}`)
        .then(res => adaptPost(res.publication, currentUserId))

/**
* @param {string} userId
* @param {{ page?: number }} [params]
* @param {string} [currentUserId]
* @returns {Promise<import('../contracts/types.js').PaginatedPosts>}
*/
export const getPostsByUser = (userId, { page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/user/${userId}/${page}`)
        .then(res => adaptPostList(res, currentUserId))
        .catch(err => {
            console.log('tipo:', typeof err.status, 'valor:', err.status)
            if (Number(err.status) === 404) return { data: [], pagination: { currentPage: 1, totalPages: 1 } }
            throw err
        })

/**
* @param {{ search: string, page?: number }} params
* @param {string} [currentUserId]
* @returns {Promise<import('../contracts/types.js').PaginatedPosts>}
*/
export const searchPosts = ({ search, page = 1 }, currentUserId) =>
    apiClient
        .get(`publication/search/${encodeURIComponent(search)}/${page}`)
        .then(res => adaptPostList(res, currentUserId))

const sanitizeFile = (file) => {
    const lastDotIndex = file.name.lastIndexOf('.')
    const hasExtension = lastDotIndex > 0 // > 0, no >= 0, para no tratar ".gitignore" como "sin nombre + ext gitignore"

    const rawBaseName = hasExtension ? file.name.slice(0, lastDotIndex) : file.name
    const ext = hasExtension ? file.name.slice(lastDotIndex + 1) : ''

    // Limpia el nombre base de cualquier carácter no alfanumérico (incluye puntos)
    const safeBaseName = rawBaseName.replace(/[^a-zA-Z0-9-_]/g, '-')

    const finalName = hasExtension ? `${safeBaseName}.${ext}` : safeBaseName
    return new File([file], finalName, { type: file.type })
}
/**
 * Crea una publicación de texto y opcionalmente sube una imagen.
 * Devuelve la respuesta cruda del backend pero con `publicationStored`
 * ya adaptada a `Post`.
 *
 * @param {{ content:string, files?:File[] }} data
 * @returns {Promise<import('../contracts/types.js').CreatePostResponseRaw & { publicationStored: import('../contracts/types.js').Post }>}
 */
export const createPost = async (data) => {
    const res = await apiClient.call('POST', 'publication/save', {
        text: data.content,
    })

    let finalPublication = res.publicationStored
    let imageUploadFailed = false

    if (data.files && data.files.length > 0) {
        try {
            const cleanFile = sanitizeFile(data.files[0])
            const uploadRes = await apiClient.upload(`publication/upload/${res.publicationStored._id}`, cleanFile)
            finalPublication = uploadRes.publication
        } catch (error) {
            console.error('No se pudo subir la imagen del post:', error)
            imageUploadFailed = true
            // finalPublication se queda con el post original (sin imagen),
            // el post en sí ya está guardado correctamente en el paso anterior
        }
    }

    return {
        ...res,
        // ⚠️ adaptPost se llama SIN currentUser a propósito, no es un bug:
        // un post recién creado no puede tener isLiked ni isBookmarked en true
        // (no existe forma de haberle dado like/bookmark antes de que exista).
        // isLiked/isBookmarked caen en su default (false), que es el valor correcto.
        publicationStored: adaptPost(finalPublication),
        imageUploadFailed
    }
}

/**
 * @param {string} id
 * @returns {Promise<import('../contracts/types.js').ToggleLikeResponseRaw>}
 */
export const likePost = (id) =>
    apiClient.call('POST', `publication/${id}/like`)

export const bookmarkPost = (id) =>
    apiClient.call('POST', `publication/${id}/bookmark`)

/**
 * @param {string} id
 * @returns {Promise<import('../contracts/types.js').DeletePostResponseRaw>}
 */
export const deletePost = (id) =>
    apiClient.call('DELETE', `publication/remove/${id}`)