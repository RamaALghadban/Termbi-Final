import { apiRequest } from './http'

export async function registerCustomer({ firstName, lastName, email, phone, password, passwordConfirmation }) {
  const form = new FormData()
  form.append('first_name', firstName)
  form.append('last_name', lastName)
  form.append('email', email)
  form.append('phone', phone)
  form.append('password', password)
  form.append('password_confirmation', passwordConfirmation)
  return apiRequest('/auth/register', { method: 'POST', body: form })
}

export async function resendVerificationCode(email) {
  const q = new URLSearchParams({ email })
  return apiRequest(`/auth/verification-code/resend?${q.toString()}`)
}

export async function verifyCustomerEmail({ email, code }) {
  const form = new FormData()
  form.append('email', email)
  form.append('code', code)
  return apiRequest('/auth/customer/verify', { method: 'POST', body: form })
}
