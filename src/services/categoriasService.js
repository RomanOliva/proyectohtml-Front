import { categorias as categoriasEjemplo } from '../data/categorias'
import { request, USAR_MOCK } from './api'

export async function listarCategorias() {
  if (USAR_MOCK) return [...categoriasEjemplo]
  return request('/api/v1/categorias')
}