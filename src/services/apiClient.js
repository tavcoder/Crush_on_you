// services/apiClient.js
import { mockClient } from './mockClient.js'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3900/api'

function getToken() {
    return localStorage.getItem('token')
}

function authHeaders(endpoint) {
    const token = getToken()
    const isPublic = ['/register', '/login'].some(r => endpoint.includes(r))
    return !isPublic && token ? { Authorization: token } : {}
}

function handleResponse(res, endpoint) {
    if (!res.ok) {
        return res.json().catch(() => ({})).then(err => {
            throw new Error(err.message || `Error ${res.status}: ${res.statusText}`)
        })
    }
    return res.json()
}

export const apiClient = {
    get(endpoint) {
        if (USE_MOCK) return mockClient.get(endpoint)
        return fetch(`${API_BASE_URL}/${endpoint}`, {
            headers: { 'Content-Type': 'application/json', ...authHeaders(endpoint) }
        }).then(res => handleResponse(res, endpoint))
    },

    call(method, endpoint, data) {
        if (USE_MOCK) return mockClient.call(method, endpoint, data)
        return fetch(`${API_BASE_URL}/${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json', ...authHeaders(endpoint) },
            body: JSON.stringify(data),
        }).then(res => handleResponse(res, endpoint))
    },

    upload(endpoint, file, fieldName = 'file0') {
        if (USE_MOCK) return mockClient.upload(endpoint, file)
        const formData = new FormData()
        formData.append(fieldName, file)
        return fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: authHeaders(endpoint),
            body: formData,
        }).then(res => handleResponse(res, endpoint))
    }
}