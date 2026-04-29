import { postsData } from './mocks/post.mock'
import { usersData } from './mocks/users.mock'
import { enrichPostsWithUserData } from '../utils/postsUtils'

const CURRENT_USER_ID = 'erch'

const MOCK_DB = {
    posts: enrichPostsWithUserData(postsData, usersData),
    users: usersData,
    currentUser: usersData.find(u => u.id === CURRENT_USER_ID),
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

// services/mockClient.js
export const mockClient = {
    get(endpoint) {
        const { path, params } = parseEndpoint(endpoint)
        const parts = path.split('/')
        const resource = parts[0]
        const id = parts[1]

        const page = Number(params.page || 1)
        const limit = Number(params.limit || 10)

        // ✅ FIX 1: 'me' ANTES que el lookup genérico por id
        if (resource === 'users' && id === 'me') {
            console.log("🟢 RETURN currentUser:", MOCK_DB.currentUser);
            return resolve({ data: MOCK_DB.currentUser });
        }

        if (resource === 'users' && !id) {
            const result = paginate(MOCK_DB.users, page, limit);
            console.log("🟢 USERS LIST:", result);
            return resolve(result);
        }

        if (resource === 'users' && id) {
            const user = MOCK_DB.users.find(u => u.id === id)
            if (!user) return Promise.reject(new Error(`User ${id} not found`))
            return resolve({ data: user })
        }

        if (resource === 'posts' && !id) {
            const result = paginate(MOCK_DB.posts, page, limit);
            console.log("🟢 POSTS LIST:", result);
            return resolve(result);
        }

        // ✅ FIX 2: mock para post individual
        if (resource === 'posts' && id) {
            const post = MOCK_DB.posts.find(p => p.id === id)
            if (!post) return Promise.reject(new Error(`Post ${id} not found`))
            return resolve({ data: post })
        }

        return Promise.reject(new Error(`No mock GET for: ${endpoint}`))
    },

    call(method, endpoint, data) {
        const [resource, id, action] = endpoint.split('/')

        // ✅ FIX 3: like/unlike con estado local en MOCK_DB
        if (method === 'PUT' && resource === 'posts' && action === 'like') {
            const post = MOCK_DB.posts.find(p => p.id === id)
            if (post) {
                post.isLiked = !post.isLiked
                post.stats.likesCount += post.isLiked ? 1 : -1
            }
            return resolve({ status: 'success', data: post })
        }

        // ✅ FIX 4: delete post
        if (method === 'DELETE' && resource === 'posts' && !action) {
            MOCK_DB.posts = MOCK_DB.posts.filter(p => p.id !== id)
            return resolve({ status: 'success' })
        }

        // ✅ FIX 5: follow/unfollow
        if (resource === 'users' && action === 'follow') {
            console.info(`[MOCK] ${method} /${endpoint}`, data)
            return resolve({ status: 'success' })
        }

        console.info(`[MOCK] ${method} /${endpoint}`, data)
        return resolve({ status: 'success', data })
    },

    upload(endpoint, file) {
        console.info(`[MOCK] UPLOAD /${endpoint}`, file.name)
        return resolve({
            status: 'success',
            data: { url: URL.createObjectURL(file) }
        })
    }
}