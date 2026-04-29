// services/api/users.api.js
import { apiClient } from '../apiClient'
import { adaptUser, adaptUserList } from './adapters/users.adapter.js'

// ─── LISTS ───

export const getUsers = ({ page = 1, limit = 10 } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}`)
        .then(res => adaptUserList(res.data));

export const searchUsers = ({ page = 1, limit = 10, search = '' } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
        .then(res => adaptUserList(res.data));

// ─── SINGLE USER ───

export const getUserById = (id) =>
    apiClient
        .get(`users/${id}`)
        .then(res => adaptUser(res.data));

export const getCurrentUser = () =>
    apiClient
        .get('users/me')
        .then(res => adaptUser(res.data));

// ─── MUTATIONS ───

export const updateProfile = (id, data) =>
    apiClient
        .call('PUT', `users/${id}`, data)
        .then(adaptUser)

export const followUser = (id) =>
    apiClient
        .call('POST', `users/${id}/follow`)


export const unfollowUser = (id) =>
    apiClient
        .call('DELETE', `users/${id}/follow`)
