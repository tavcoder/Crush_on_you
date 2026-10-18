import { describe, it, expect } from 'vitest'
import { codeFromStatus, ApiError, ERROR_MESSAGES } from './ApiError.js'

describe('codeFromStatus', () => {
    it.each([
        [400, 'VALIDATION'],
        [401, 'SESSION_EXPIRED'],
        [403, 'FORBIDDEN'],
        [404, 'NOT_FOUND'],
        [422, 'VALIDATION'],
        [500, 'SERVER'],
        [undefined, 'UNKNOWN'],
    ])('maps status %s to %s', (status, code) => {
        expect(codeFromStatus(status)).toBe(code)
    })
})

describe('ApiError', () => {
    it('never exposes the backend message but keeps it as cause', () => {
        const cause = { message: 'Faltan datos por enviar' }
        const err = new ApiError('VALIDATION', { status: 400, cause })
        expect(err.message).toBe(ERROR_MESSAGES.VALIDATION)
        expect(err.message).not.toContain('Faltan')
        expect(err.cause).toBe(cause)
    })

    it('stores code and status', () => {
        const err = new ApiError('FORBIDDEN', { status: 403 })
        expect(err.code).toBe('FORBIDDEN')
        expect(err.status).toBe(403)
    })

    it('falls back to UNKNOWN for an unrecognized code', () => {
        const err = new ApiError('LOL')
        expect(err.code).toBe('UNKNOWN')
        expect(err.message).toBe(ERROR_MESSAGES.UNKNOWN)
    })
})