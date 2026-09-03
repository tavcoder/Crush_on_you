//mockClient
import { postsData } from './mocks/post.mock'
import { usersData } from './mocks/users.mock'
import { enrichPostsWithUserData } from '../utils/postsUtils'
import { ApiError } from '../services/ApiError'

let currentToken = localStorage.getItem('token') ?? 'erch'

export function setMockToken(token) {
    currentToken = token
    MOCK_DB.currentUser = MOCK_DB.users.find(u => u.id === token)

    if (!MOCK_DB.currentUser) {
        console.warn(`[MOCK] User ${token} not found, creating placeholder`)
        MOCK_DB.currentUser = {
            id: token,
            userName: 'Unknown',
            userSurName: '',
            userNick: 'unknown',
            email: '',
            avatarUrl: null,
            isOnline: false,
            hasStory: false,
            isUnseen: false,
            following: [],
            followers: [],
        }
    }
}

export function getMockToken() {
    return currentToken
}

let MOCK_DB = createMockDB()

function createMockDB() {
    return {
        posts: enrichPostsWithUserData(postsData, usersData),
        users: [...usersData],
        currentUser: usersData.find(u => u.id === currentToken),
    }
}

export function resetMockDB() {
    MOCK_DB = createMockDB()
}

function createId() {
    return Math.random().toString(36).substring(2, 10);
}
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
            const user = MOCK_DB.users.find(u => u.id === currentToken)
            if (!user) return Promise.reject(new ApiError('User not found', 404))
            return resolve({ data: user })
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
            let filtered = MOCK_DB.posts

            if (params.userId) {
                filtered = filtered.filter(p => p.authorId === params.userId)
            }

            if (params.search) {
                const q = params.search.toLowerCase()
                filtered = filtered.filter(p =>
                    p.content?.toLowerCase().includes(q) ||
                    p.author?.userName?.toLowerCase().includes(q)
                )
            }

            const result = paginate(filtered, page, limit)
            return resolve(result)
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
        if (method === 'POST' && resource === 'auth' && id === 'login') {
            const { email } = data
            const user = MOCK_DB.users.find(u => u.email === email)
            if (!user) return Promise.reject(new ApiError('User not found', 404))

            //Sincronizar currentUser (saveToken lo hará también, pero el mock necesita estar listo)
            MOCK_DB.currentUser = user
            currentToken = user.id

            return resolve({ status: 'success', data: { token: user.id } })
        }

        if (method === 'POST' && resource === 'auth' && id === 'register') {
            const newUser = {
                id: createId(),
                userName: data.name,
                userNick: data.nick,
                email: data.email,
                password: data.password,
                avatarUrl: null,
                isOnline: true,
                hasStory: false,
                isUnseen: false,
                following: [],
                followers: [],
            }

            MOCK_DB.users.unshift(newUser)

            // Sincronizar currentUser inmediatamente
            // (saveToken + setMockToken lo harán también, pero el mock necesita estar listo)
            MOCK_DB.currentUser = newUser
            currentToken = newUser.id

            return resolve({ status: 'success', data: { token: newUser.id } })
        }
        if (method === 'POST' && resource === 'posts' && !action) {
            // Defensivo: si no hay currentUser, rechazar
            if (!MOCK_DB.currentUser) {
                return Promise.reject(new ApiError('Not authenticated', 401))
            }

            const newPost = {
                id: `post_${Date.now()}`,
                authorId: MOCK_DB.currentUser.id,
                author: MOCK_DB.currentUser,
                ...data,
                stats: { likesCount: 0, commentsCount: 0, sharesCount: 0 },
                isLiked: false,
                isBookmarked: false,
                createdAt: new Date().toISOString(),
            }

            MOCK_DB.posts.unshift(newPost)
            return resolve({ status: 'success', data: newPost })
        }

        if (method === 'PUT' && resource === 'users' && id && !action) {
            const user = MOCK_DB.users.find(u => u.id === id)
            if (!user) return Promise.reject(new ApiError(`User ${id} not found`, 404))

            Object.assign(user, data)// ← actualiza solo los campos que llegan en data
            MOCK_DB.currentUser = user  // siempre sincroniza — solo el currentUser puede editarse

            return resolve({ status: 'success', data: user })
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
                const currentUser = MOCK_DB.currentUser
                const alreadyFollowing = currentUser.following.some(f => f.userId === id)
                if (!alreadyFollowing) {
                    currentUser.following.push({ userId: id })
                    const targetUser = MOCK_DB.users.find(u => u.id === id)
                    if (targetUser) targetUser.followers.push({ userId: currentUser.id })
                }
                return resolve({ status: 'success' })
            }
            if (method === 'DELETE') {
                const currentUser = MOCK_DB.currentUser
                currentUser.following = currentUser.following.filter(f => f.userId !== id)
                const targetUser = MOCK_DB.users.find(u => u.id === id)
                if (targetUser) {
                    targetUser.followers = targetUser.followers.filter(f => f.userId !== currentUser.id)
                }
                return resolve({ status: 'success' })
            }
        }

        return Promise.reject(
            new ApiError(`[MOCK] There is no implementation for: ${method} /${endpoint}`)
        )
    },

    upload(endpoint, file) {
        const [resource, id] = endpoint.split('/')
        const user = MOCK_DB.users.find(u => u.id === id)
        if (!user) return Promise.reject(new ApiError(`User ${id} not found`, 404))

        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                user.avatarUrl = reader.result
                resolve({
                    status: 'success',
                    data: { avatarUrl: reader.result }
                })
            }
            reader.onerror = () => reject(new ApiError('Error al leer el archivo'))
            reader.readAsDataURL(file)
        })
    }
}