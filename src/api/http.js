import { API_BASE_URL, getStoredLang, getStoredToken } from './config'

async function parseJsonSafe(res) {
  try {
    return await res.json()
  } catch {
    return null
  }
}

function buildErrorMessage(data, status) {
  const direct = data && (data.message || data.error || data?.data?.message)
  if (typeof direct === 'string' && direct.trim()) return direct

  const errors = data?.errors || data?.data?.errors
  if (errors && typeof errors === 'object') {
    const parts = []
    for (const key of Object.keys(errors)) {
      const v = errors[key]
      if (Array.isArray(v) && v.length) parts.push(`${key}: ${v[0]}`)
      else if (typeof v === 'string' && v.trim()) parts.push(`${key}: ${v}`)
    }
    if (parts.length) return parts.join(' | ')
  }

  return `Request failed (${status})`
}

export async function apiRequest(path, { method = 'GET', headers, body } = {}) {
  const token = getStoredToken()
  const lang = getStoredLang()

  const finalHeaders = {
    Accept: 'application/json',
    'Accept-Language': lang,
    ...(headers || {}),
  }

  if (token) {
    finalHeaders.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: finalHeaders,
    body,
  })

  const data = await parseJsonSafe(res)

  if (!res.ok) {
    const message = buildErrorMessage(data, res.status)
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }

  return data
}
