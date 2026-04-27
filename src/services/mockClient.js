// services/mockClient.js
import { postsData } from './mocks/post.mock'
import { usersData } from './mocks/users.mock'
import { enrichPostsWithUserData } from '../utils/postsUtils'

const MOCK_DB = {
    posts: enrichPostsWithUserData(postsData, usersData),
    users: usersData,
}

function resolve(data, delay = 200) {
    return new Promise(res => setTimeout(() => res(data), delay))
}

function findResource(endpoint) {
    const key = Object.keys(MOCK_DB).find(k => endpoint.startsWith(k))
    return key ? MOCK_DB[key] : null
}

export const mockClient = {
    get(endpoint) {
        const data = findResource(endpoint)
        if (!data) return Promise.reject(new Error(`No mock for: ${endpoint}`))
        return resolve({
            data,
            pagination: {
                currentPage: 1,
                totalPages: 1,
            }
        })
    },

    call(method, endpoint, data) {
        console.info(`[MOCK] ${method} /${endpoint}`, data)
        return resolve({ status: 'success', data })
    },

    upload(endpoint, file) {
        console.info(`[MOCK] UPLOAD /${endpoint}`, file.name)
        return resolve({ status: 'success', url: URL.createObjectURL(file) })
    }
}