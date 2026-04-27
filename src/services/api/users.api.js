// users.api.js
import { apiClient } from '../apiClient'
import { adaptUser, adaptUserList } from './adapters/users.adapter.js'

export const getUsers = ({ page = 1, limit = 10 } = {}) =>
    apiClient
        .get(`posts?page=${page}&limit=${limit}`)
        .then(adaptUserList)

export const searchUsers = ({ page = 1, limit = 10, search = '' } = {}) =>
    apiClient
        .get(`users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
        .then(adaptUserList)

export const getUserById = (id) =>
    apiClient
        .get(`users/${id}`)
        .then(adaptUser)

export const getCurrentUser = () =>
    apiClient
        .get('users/me')
        .then(adaptUser)

export const updateProfile = (id, data) =>
    apiClient.call('PUT', `users/${id}`, data)

export const followUser = (id) =>
    apiClient.call('POST', `users/${id}/follow`)

export const unfollowUser = (id) =>
    apiClient.call('DELETE', `users/${id}/follow`)