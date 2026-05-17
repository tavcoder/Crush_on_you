import { postsData } from './mocks/post.mock'
import { usersData } from './mocks/users.mock'
import { enrichPostsWithUserData } from '../utils/postsUtils'
import { ApiError } from '../ApiError.js'

const CURRENT_USER_ID = 'erch'

let MOCK_DB = createMockDB()

function createMockDB() {
    return {
        posts: enrichPostsWithUserData(postsData, usersData),
        currentUser: usersData.find(u => u.id === CURRENT_USER_ID),
    }
}

export function resetMockDB() {
    MOCK_DB = createMockDB()
}

export const MOCK_TOKEN = CURRENT_USER_ID

function resolve(data, delay = 200) {
    return new Promise(res => setTimeout(() => res(data), delay))
}

function parseEndpoint(endpoint) {
    const [path, queryString] = endpoint.split('?')
    const params = new URLSearchParams(queryString || '')

    return {
        path,
        params: Object.fromEntries(params.entries())
    }
}

function paginate(array, page, limit) {
    const start = (page - 1) * limit
    const end = start + limit

    return {
        data: array.slice(start, end),
        pagination: {
            currentPage: page,
            limit,
            total: array.length,
            totalPages: Math.ceil(array.length / limit)
        }
    }
}

export const mockClient = {
    get(endpoint) {
        const { path, params } = parseEndpoint(endpoint)
        const parts = path.split('/')
        const resource = parts[0]
        const id = parts[1]

        const page = Number(params.page || 1)
        const limit = Number(params.limit || 10)

        if (resource === 'users' && id === 'me') {
            return resolve({ data: MOCK_DB.currentUser });
        }

        if (resource === 'users' && !id) {
            let filtered = MOCK_DB.users

            if (params.search) {
                const q = params.search.toLowerCase()
                filtered = filtered.filter(u =>
                    u.userName.toLowerCase().includes(q) ||
                    u.userSurName.toLowerCase().includes(q) ||
                    u.userNick.toLowerCase().includes(q)
                )
            }

            const result = paginate(filtered, page, limit)
            return resolve(result)
        }

        if (resource === 'users' && id) {
            const user = MOCK_DB.users.find(u => u.id === id)
            if (!user) return Promise.reject(new ApiError(`User ${id} not found`))
            return resolve({ data: user })
        }

        if (resource === 'posts' && !id) {
            const result = paginate(MOCK_DB.posts, page, limit);
            return resolve(result);
        }

        if (resource === 'posts' && id) {
            const post = MOCK_DB.posts.find(p => p.id === id)
            if (!post) return Promise.reject(new ApiError(`Post ${id} not found`))
            return resolve({ data: post })
        }

        return Promise.reject(new ApiError(`No mock GET for: ${endpoint}`))
    },

    call(method, endpoint, data) {
        const [resource, id, action] = endpoint.split('/')
        if (method === 'POST' && resource === 'posts' && !action) {
            const newPost = {
                id: `post_${Date.now()}`,
                authorId: MOCK_DB.currentUser.id,
                author: MOCK_DB.currentUser,
                ...data,                    // ← aquí usas data
                stats: { likesCount: 0, commentsCount: 0, sharesCount: 0 },
                isLiked: false,
                isBookmarked: false,
                createdAt: new Date().toISOString(),
            }
            MOCK_DB.posts.unshift(newPost)
            return resolve({ status: 'success', data: newPost })
        }

        if (method === 'PUT' && resource === 'posts' && action === 'like') {
            const post = MOCK_DB.posts.find(p => p.id === id)
            if (post) {
                post.isLiked = !post.isLiked
                post.stats.likesCount += post.isLiked ? 1 : -1
            }
            return resolve({ status: 'success', data: post })
        }

        if (method === 'DELETE' && resource === 'posts' && !action) {
            MOCK_DB.posts = MOCK_DB.posts.filter(p => p.id !== id)
            return resolve({ status: 'success' })
        }

        if (resource === 'users' && action === 'follow') {
            if (method === 'POST') {
                return resolve({ status: 'success' })
            }
            if (method === 'DELETE') {
                return resolve({ status: 'success' })
            }
            return Promise.reject(new ApiError(`[MOCK] Método no soportado: ${method} /users/${id}/follow`))
        }

        return Promise.reject(
            new ApiError(`[MOCK] There is no implementation for: ${method} /${endpoint}`)
        )
    },

    upload(endpoint, file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve({
                status: 'success',
                data: { url: reader.result }  // ← data:image/png;base64,...
            })
            reader.readAsDataURL(file)
        })
    }
}