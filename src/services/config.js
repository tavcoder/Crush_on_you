// services/config.js: único sitio que lee el entorno
export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3900/api'
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'
export const DEMO_MODE = import.meta.env.MODE === 'demo'