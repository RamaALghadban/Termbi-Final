import { apiRequest } from './http'

export async function loginWithEmail({ email, password }) {
  const form = new FormData()
  form.append('email', email)
  form.append('password', password)

  const res = await apiRequest('/auth/login', {
    method: 'POST',
    body: form,
  })

  const token =
    res?.token ||
    res?.access_token ||
    res?.data?.token ||
    res?.data?.access_token ||
    res?.data?.data?.token ||
    res?.data?.data?.access_token
  if (!token) {
    const keys = res && typeof res === 'object' ? Object.keys(res).join(', ') : ''
    throw new Error(`Login succeeded but token is missing${keys ? ` (response keys: ${keys})` : ''}`)
  }

  return { token, raw: res }
}

export async function getProfile() {
  return apiRequest('/auth/profile')
}

export async function logout() {
  return apiRequest('/auth/logout')
}

export async function updateCustomerProfile({ firstName, lastName, password, passwordConfirmation, profileFile }) {
  const form = new FormData()
  if (typeof firstName === 'string') form.append('first_name', firstName)
  if (typeof lastName === 'string') form.append('last_name', lastName)
  if (password) form.append('password', password)
  if (passwordConfirmation) form.append('password_confirmation', passwordConfirmation)
  if (profileFile) form.append('profile', profileFile)

  return apiRequest('/customer-profile/update', {
    method: 'POST',
    body: form,
  })
}
