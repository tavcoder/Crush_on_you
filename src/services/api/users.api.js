// services/api/users.api.js
import { apiClient } from '../apiClient'
import { adaptUser, adaptUserList } from './adapters/users.adapter.js'

// ─── LISTS ───

export const getUsers = ({ page = 1 } = {}) =>
    apiClient
        .get(`user/list/${page}`)
        .then(adaptUserList)

// ─── SINGLE USER ───

export const getUserById = (id) =>
    apiClient
        .get(`user/profile/${id}`)
        .then(res => adaptUser(res.user));

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
export const loginUser = ({ email, password }) =>
    apiClient.call('POST', 'user/login', { email, password })
        .then(res => ({
            token: res.token,
            userId: res.user._id
        }))

export const registerUser = ({ name, surname, nick, email, password }) =>
    apiClient.call('POST', 'user/register', { name, surname, nick, email, password })
        .then(res => adaptUser(res.user))

export const updateProfile = (data) =>
    apiClient
        .call('PUT', 'user/update', data)
        .then(res => adaptUser(res.user))

export const followUser = (id) =>
    apiClient.call('POST', 'follow/follow', { followed: id })

export const unfollowUser = (id) =>
    apiClient.call('DELETE', `follow/unfollow/${id}`)

export const uploadAvatar = (data) =>
    apiClient
        .upload(`user/upload`, data)
        .then(res => adaptUser(res.user))