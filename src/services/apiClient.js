// services/apiClient.js
import { API_BASE_URL, USE_MOCK, DEMO_MODE } from './config.js'
import { mockClient, getMockToken, setMockToken, removeMockToken } from './mockClient.js'
import { simulatePresence } from './demo/simulatePresence.js'
import { ApiError, codeFromStatus } from './ApiError.js'


export function getToken() {
    if (USE_MOCK) return getMockToken()
    return localStorage.getItem('token')
}

export function saveToken(token) {
    localStorage.setItem('token', token)
    if (USE_MOCK) setMockToken(token)
}

export function removeToken() {
    localStorage.removeItem('token')
    if (USE_MOCK) removeMockToken()
}

function authHeaders(endpoint) {
    const token = getToken()
    const isPublic = ['/register', '/login'].some(r => endpoint.includes(r))
    return !isPublic && token ? { Authorization: token } : {}
}

async function handleResponse(res) {
    if (res.ok) return res.json()
    const body = await res.json().catch(() => ({}))
    throw new ApiError(codeFromStatus(res.status), { status: res.status, cause: body })
}


async function request(url, options) {
    let res
    try {
        res = await fetch(url, options)
    } catch (cause) {
        // Con el navegador online, un fetch rechazado es un problema del servidor
        throw new ApiError(navigator.onLine ? 'SERVER' : 'NETWORK', { cause })
    }
    const data = await handleResponse(res)
    return DEMO_MODE ? simulatePresence(data) : data
}

export const apiClient = {
    get(endpoint) {
        if (USE_MOCK) return mockClient.get(endpoint)
        return request(`${API_BASE_URL}/${endpoint}`, {
            headers: { 'Content-Type': 'application/json', ...authHeaders(endpoint) }
        })
    },

    call(method, endpoint, data) {
        if (USE_MOCK) return mockClient.call(method, endpoint, data)
        return request(`${API_BASE_URL}/${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json', ...authHeaders(endpoint) },
            body: JSON.stringify(data),
        })
    },

    upload(endpoint, file, fieldName = 'file0') {
        if (USE_MOCK) return mockClient.upload(endpoint, file)
        const formData = new FormData()
        formData.append(fieldName, file)
        return request(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: authHeaders(endpoint),
            body: formData,
        })
    }
}