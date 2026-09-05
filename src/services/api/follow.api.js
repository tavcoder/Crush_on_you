// services/api/follow.api.js
import { apiClient } from './../apiClient.js'
import { adaptFollowList } from './adapters/follows.adapter.js'

/**
 * Lista paginada de usuarios que siguen al usuario indicado.
 *
 * @param {string} userId
 * @param {{ page?: number }} [params]
 * @returns {Promise<import('../contracts/types.js').PaginatedUsers>}
 */
export const getFollowers = (userId, { page = 1 } = {}) =>
    apiClient
        .get(`follow/followers/${userId}/${page}`)
        .then(res => adaptFollowList(res, 'followers'))

/**
 * Lista paginada de usuarios a los que sigue el usuario indicado.
 *
 * @param {string} userId
 * @param {{ page?: number }} [params]
 * @returns {Promise<import('../contracts/types.js').PaginatedUsers>}
 */
export const getFollowing = (userId, { page = 1 } = {}) =>
    apiClient
        .get(`follow/following/${userId}/${page}`)
        .then(res => adaptFollowList(res, 'following'))


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