import { apiRequest } from './http'

export async function getRestaurantTables({ restaurantAdminId } = {}) {
  const q = new URLSearchParams()
  if (restaurantAdminId) q.set('restaurant_admin_id', String(restaurantAdminId))
  const suffix = q.toString() ? `?${q.toString()}` : ''
  return apiRequest(`/restaurant-tables${suffix}`)
}
