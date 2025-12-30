import { apiRequest } from './http'

export async function getOrders() {
  return apiRequest('/orders')
}

export async function getOrderById(id) {
  return apiRequest(`/orders/${id}`)
}
