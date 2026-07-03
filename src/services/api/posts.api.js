// posts.api.js
import { apiClient } from '../apiClient'
import { adaptPost, adaptPostList } from './adapters/posts.adapter'

export const getPosts = ({ page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/feed/${page}`)
        .then(res => adaptPostList(res, currentUserId))

export const getPost = (id, currentUserId) =>
    apiClient.get(`publication/detail/${id}`)
        .then(res => adaptPost(res.publication, currentUserId))

export const getPostsByUser = (userId, { page = 1 } = {}, currentUserId) =>
    apiClient
        .get(`publication/user/${userId}/${page}`)
        .then(res => adaptPostList(res, currentUserId))

// TODO: [DEUDA TÉCNICA] El backend no tiene endpoint de búsqueda de publicaciones.
// Implementar GET publication/search?q= en el backend.
export const searchPosts = () => Promise.resolve({ data: [], pagination: { currentPage: 1, totalPages: 1 } })

export const createPost = (data) =>
    apiClient.call('POST', 'publication/save', data)
        .then(res => ({ ...res, publicationStored: adaptPost(res.publicationStored) }))

export const likePost = (id) =>
    apiClient.call('POST', `publication/${id}/like`)

export const deletePost = (id) =>
    apiClient.call('DELETE', `publication/remove/${id}`)