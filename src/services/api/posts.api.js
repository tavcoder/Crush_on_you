// posts.api.js
import { apiClient } from '../apiClient'
import { adaptPost, adaptPostList } from './adapters/posts.adapter'

export const getPosts = ({ page = 1, limit = 10 } = {}) =>
    apiClient
        .get(`posts?page=${page}&limit=${limit}`)
        .then(adaptPostList)

export const getPost = (id) =>
    apiClient.get(`posts/${id}`)
        .then(adaptPost)

export const createPost = (data) =>
    apiClient.call('POST', 'posts', data)

export const likePost = (id) =>
    apiClient.call('PUT', `posts/${id}/like`)

export const deletePost = (id) =>
    apiClient.call('DELETE', `posts/${id}`)