// services/api/users.api.js
import { apiClient } from '../apiClient'
import { adaptUser, adaptUserList } from './adapters/users.adapter.js'

// ─── LISTS ───
/**
 * @returns {Promise<import('../contracts/types.js').PaginatedUsers>}
 */
export const getUsers = ({ page = 1 } = {}) =>
    apiClient
        .get(`user/list/${page}`)
        .then(adaptUserList)

// ─── SINGLE USER ───
/**
 * @param {string} id
 * @returns {Promise<import('../contracts/types.js').User>}
 */
export const getUserById = (id) =>
    apiClient
        .get(`user/profile/${id}`)
        .then(res => {
            const raw = {
                ...res.user,
                following: res.following,
                followers: res.follower
            };
            return adaptUser(raw);
        });

// TODO: [DEUDA TÉCNICA] El backend no tiene endpoint de búsqueda de usuarios.
// Implementar GET user/search?q= en el backend.
export const searchUsers = () =>
    Promise.resolve({ data: [], pagination: { currentPage: 1, totalPages: 1 } })

// TODO: [DEUDA TÉCNICA] No hay endpoint de sugerencias. Usa getUsers como fallback.
export const getUserSuggestions = ({ page = 1 } = {}) =>
    apiClient
        .get(`user/list/${page}`)
        .then(adaptUserList)

// ─── MUTATIONS ───
/**
 * @returns {Promise<import('../contracts/types.js').LoginResponseRaw>}
 */
export const loginUser = ({ email, password }) =>
    apiClient.call('POST', 'user/login', { email, password })
        .then(res => ({
            token: res.token,
            userId: res.user.id
        }))

/**
 * @param {{ name:string, surname:string, nick:string, email:string, password:string }} payload
 * @returns {Promise<import('../contracts/types.js').User>}
 */
export const registerUser = ({ name, surname, nick, email, password }) =>
    apiClient.call('POST', 'user/register', { name, surname, nick, email, password })
        .then(res => adaptUser(res.user))

/**
* @param {import('../contracts/types.js').User} data
* @returns {Promise<import('../contracts/types.js').User>}
*/
export const updateProfile = (data) =>
    apiClient.call('PUT', 'user/update', {
        name: data.userName,
        surname: data.userSurName,
        nick: data.userNick,
        email: data.email,
        bio: data.bio,
        city: data.city,
        country: data.country,
        education: data.education,
        languages: data.languages,
        smoke: data.smoke,
    })
        .then(res => adaptUser(res.user))

/**
* Crea una relación de follow entre el usuario autenticado y el usuario `id`.
* Usa la respuesta cruda del backend solo como confirmación; la UI se actualiza
* principalmente con actualización optimista e invalidación de caché.
*
* @param {string} id - ID del usuario al que se quiere seguir
* @returns {Promise<import('../contracts/types.js').SaveFollowResponseRaw>}
*/
export const followUser = (id) =>
    apiClient.call('POST', 'follow/follow', { followed: id })

/**
 * Elimina la relación de follow con el usuario `id`.
 * La respuesta solo contiene estado y mensaje; no devuelve un User.
 *
 * @param {string} id - ID del usuario al que se quiere dejar de seguir
 * @returns {Promise<import('../contracts/types.js').UnfollowResponseRaw>}
 */
export const unfollowUser = (id) =>
    apiClient.call('DELETE', `follow/unfollow/${id}`)

/**
 * Sube un nuevo avatar para el usuario autenticado y devuelve
 * el usuario actualizado ya adaptado al dominio frontend.
 *
 * @param {File} file - Archivo de imagen a subir (PNG, JPG, JPEG, GIF)
 * @returns {Promise<import('../contracts/types.js').User>}
 */
export const uploadAvatar = (file) =>
    apiClient
        .upload('user/upload', file)
        .then(res => adaptUser(res.user));