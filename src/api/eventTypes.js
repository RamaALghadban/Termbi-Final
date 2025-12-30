import { apiRequest } from './http'

export async function getEventTypes() {
  return apiRequest('/event-types')
}
