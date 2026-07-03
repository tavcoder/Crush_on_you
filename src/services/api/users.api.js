// services/api/users.api.js
import { apiClient } from '../apiClient'
import { adaptUser, adaptUserList } from './adapters/users.adapter.js'

// ─── LISTS ───

export const getUsers = ({ page = 1, limit = 10 } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}`)
        .then(adaptUserList)

export const getUserSuggestions = ({ page = 1, limit = 10 } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}`)
        .then(adaptUserList)

export const searchUsers = ({ page = 1, limit = 10, search = '' } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
        .then(adaptUserList)

// ─── SINGLE USER ───

export const getUserById = (id) =>
    apiClient
        .get(`users/profile/${id}`)
        .then(res => adaptUser(res.user));

export const getCurrentUser = () =>
    apiClient
        .get('users/me')
        .then(res => adaptUser(res.data));

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

export const updateProfile = (id, data) =>
    apiClient
        .call('PUT', `users/${id}`, data)
        .then(res => adaptUser(res.data))

export const followUser = (id) =>
    apiClient
        .call('POST', `users/${id}/follow`)


export const unfollowUser = (id) =>
    apiClient
        .call('DELETE', `users/${id}/follow`)

export const uploadAvatar = (id, data) =>
    apiClient
        .upload(`users/${id}`, data)
        .then(res => adaptUser(res.data))