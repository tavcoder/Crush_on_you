// services/ApiError.js
export const ERROR_MESSAGES = {
    NETWORK: "You're offline. Check your connection and try again.",
    INVALID_CREDENTIALS: 'Incorrect email or password.',
    USER_EXISTS: 'An account with this email or nickname already exists.',
    VALIDATION: 'Some of the data is not valid. Please check it and try again.',
    SESSION_EXPIRED: 'Your session has expired. Please log in again.',
    NOT_FOUND: "We couldn't find what you were looking for.",
    SERVER: 'Something went wrong on our side. Please try again later.',
    UNKNOWN: 'Something went wrong. Please try again.',
    FORBIDDEN: "You don't have permission to do that.",
}

export function codeFromStatus(status) {
    if (status === 401) return 'SESSION_EXPIRED'
    if (status === 403) return 'FORBIDDEN' // TODO: [DEUDA TÉCNICA] el backend también usa 403 si falta la cabecera Authorization
    if (status === 404) return 'NOT_FOUND' // TODO: [DEUDA TÉCNICA] el backend usa 404 también para token inválido
    if (status >= 500) return 'SERVER'
    if (status >= 400) return 'VALIDATION'
    return 'UNKNOWN'
}

export class ApiError extends Error {
    constructor(code, { status, cause } = {}) {
        const known = Object.hasOwn(ERROR_MESSAGES, code) ? code : 'UNKNOWN'
        super(ERROR_MESSAGES[known], { cause })
        this.name = 'ApiError'
        this.code = known
        this.status = status
    }
}

export const isConnectionError = (error) =>
    error instanceof ApiError && (error.code === 'NETWORK' || error.code === 'SERVER')