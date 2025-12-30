export const API_BASE_URL = import.meta.env.PROD
  ? 'https://sanad.tamkeen-dev.com/api'
  : '/api'

export const STORAGE_KEYS = {
  auth: 'termby_auth',
  role: 'termby_role',
  lang: 'termby_lang',
  token: 'termby_token',
}

export function getStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEYS.lang) || 'en'
  } catch {
    return 'en'
  }
}

export function getStoredToken() {
  try {
    return localStorage.getItem(STORAGE_KEYS.token) || ''
  } catch {
    return ''
  }
}

export function setStoredToken(token) {
  try {
    localStorage.setItem(STORAGE_KEYS.token, token || '')
  } catch {
  }
}

export function clearStoredToken() {
  try {
    localStorage.setItem(STORAGE_KEYS.token, '')
  } catch {
  }
}
