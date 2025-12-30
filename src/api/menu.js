import { apiRequest } from './http'

export async function getCategories({ restaurantAdminId, withProducts = true, sortBy = 'name', sortTerm = 'asc' } = {}) {
  const q = new URLSearchParams()
  if (withProducts) q.set('with_products', '1')
  if (restaurantAdminId) q.set('restaurant_admin_id', String(restaurantAdminId))
  if (sortBy) q.set('sort_by', sortBy)
  if (sortTerm) q.set('sort_term', sortTerm)
  return apiRequest(`/categories?${q.toString()}`)
}

export async function getProducts({ restaurantAdminId, categoryId, search, popular, sortBy = 'name', sortTerm = 'asc' } = {}) {
  const q = new URLSearchParams()
  if (restaurantAdminId) q.set('restaurant_admin_id', String(restaurantAdminId))
  if (categoryId) q.set('category_id', String(categoryId))
  if (typeof search === 'string' && search.trim()) q.set('search', search.trim())
  if (popular) q.set('popular', '1')
  if (sortBy) q.set('sort_by', sortBy)
  if (sortTerm) q.set('sort_term', sortTerm)
  const suffix = q.toString() ? `?${q.toString()}` : ''
  return apiRequest(`/products${suffix}`)
}
