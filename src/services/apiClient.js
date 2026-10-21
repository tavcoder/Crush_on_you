// services/apiClient.js
import { mockClient, getMockToken, setMockToken, removeMockToken } from './mockClient.js'
import { ApiError, codeFromStatus } from './ApiError.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3900/api'

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

function handleResponse(res) {
    if (!res.ok) {
        return res.json()
            .catch(() => ({}))// el catch solo envuelve fetch: los errores de handleResponse ya son ApiError.
            .then(body => {
                throw new ApiError(codeFromStatus(res.status), { status: res.status, cause: body })
            })
    }
    return res.json()
}

function request(url, options) {
    return fetch(url, options)
        .catch(cause => {
            // Con el navegador online, un fetch rechazado es un problema del servidor
            throw new ApiError(navigator.onLine ? 'SERVER' : 'NETWORK', { cause })
        })
        .then(handleResponse)
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