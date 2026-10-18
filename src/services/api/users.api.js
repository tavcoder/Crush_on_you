// services/api/users.api.js
import { apiClient } from '../apiClient'
import { ApiError } from '../ApiError.js'
import { adaptUser, adaptUserList, adaptUserStats } from './adapters/users.adapter.js'

// Login: el backend responde 400 (contraseña incorrecta) o 404 (usuario inexistente).
// Se unifican en un solo mensaje para no revelar si el email está registrado.
const toCredentialsError = (e) => {
    if (e instanceof ApiError && (e.status === 400 || e.status === 404)) {
        throw new ApiError('INVALID_CREDENTIALS', { status: e.status, cause: e })
    }
    throw e
}

// TODO: [DEUDA TÉCNICA] el backend responde 200 sin `user` cuando el email/nick ya existe;
// debería ser un 409. Se resuelve en el front para no tocar el backend.
const assertUserReturned = (res) => {
    if (!res.user) throw new ApiError('USER_EXISTS', { status: 200 })
    return res
}

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
/**
 * ⚠️ El backend devuelve el campo de seguidores en singular: `res.follower`
 * (no `res.followers`). Confirmado contra el endpoint real — no es un typo
 * es así como lo nombra la API. Si este endpoint cambia de forma,
 * revisar aquí primero antes de asumir que el frontend tiene el bug.
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

export const getUserStats = (userId) =>
    apiClient
        .get(`user/counters/${userId}`)
        .then(adaptUserStats)

export const searchUsers = ({ search, page = 1 }) =>
    apiClient
        .get(`user/search/${encodeURIComponent(search)}/${page}`)
        .then(adaptUserList)

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
        .catch(toCredentialsError)
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
        .then(assertUserReturned)
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
        city: data.city,
        country: data.country,
        interests: data.interests,
        profileDetails: {
            bio: data.bio,
            education: data.education,
            languages: data.languages,
            smoke: data.smoke,
            drink: data.drink,
        }
    })
        .then(assertUserReturned)
        .then(res => adaptUser(res.user))


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