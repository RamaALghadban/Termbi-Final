import { apiRequest } from './http'

export async function getReservations({ restaurantAdminId } = {}) {
  const q = new URLSearchParams()
  if (restaurantAdminId) q.set('restaurant_admin_id', String(restaurantAdminId))
  const suffix = q.toString() ? `?${q.toString()}` : ''
  return apiRequest(`/reservations${suffix}`)
}

export async function createReservation(payload) {
  return apiRequest('/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
