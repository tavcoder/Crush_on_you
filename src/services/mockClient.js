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

export const mockClient = {
    get(endpoint) {
        const { path, params } = parseEndpoint(endpoint)
        const [resource, id] = path.split('/')

        const page = Number(params.page || 1)
        const limit = Number(params.limit || 10)

        // USERS
        if (resource === 'users' && !id) {
            return resolve(paginate(MOCK_DB.users, page, limit))
        }

        // POSTS
        if (resource === 'posts' && !id) {
            return resolve(paginate(MOCK_DB.posts, page, limit))
        }

        // USER BY ID
        if (resource === 'users' && id) {
            const user = MOCK_DB.users.find(u => u.id === id)
            if (!user) throw new Error(`User ${id} not found`)
            return resolve({ data: user })
        }

        // CURRENT USER
        if (resource === 'users' && id === 'me') {
            return resolve({ data: MOCK_DB.currentUser })
        }

        throw new Error(`No mock for: ${endpoint}`)
    },

    call(method, endpoint, data) {
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