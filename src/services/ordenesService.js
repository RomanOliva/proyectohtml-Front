import { ordenes as ordenesEjemplo } from '../data/ordenes'
import { request, USAR_MOCK } from './api'

export async function listarOrdenes() {
  if (USAR_MOCK) return [...ordenesEjemplo]
  return request('/api/v1/boletas')
}