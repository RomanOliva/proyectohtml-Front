import { categorias as categoriasEjemplo } from '../data/categorias'
import { productos as productosEjemplo } from '../data/productos'
import { request, USAR_MOCK } from './api'

const RUTA = '/api/v1/productos'

// Copia en memoria que simula la base de datos mientras no hay backend
let mock = [...productosEjemplo]

function armarProducto(id, datos) {
  const { categoriaId, ...resto } = datos
  return {
    id,
    ...resto,
    categoria: categoriasEjemplo.find((c) => c.id === categoriaId),
  }
}

export async function listarProductos() {
  if (USAR_MOCK) return [...mock]
  return request(RUTA)
}

export async function crearProducto(datos) {
  if (USAR_MOCK) {
    const id = mock.reduce((max, p) => Math.max(max, p.id), 0) + 1
    const nuevo = armarProducto(id, datos)
    mock = [...mock, nuevo]
    return nuevo
  }
  return request(RUTA, { method: 'POST', body: datos })
}

export async function actualizarProducto(id, datos) {
  if (USAR_MOCK) {
    const actualizado = armarProducto(id, datos)
    mock = mock.map((p) => (p.id === id ? actualizado : p))
    return actualizado
  }
  return request(`${RUTA}/${id}`, { method: 'PUT', body: datos })
}

export async function eliminarProducto(id) {
  if (USAR_MOCK) {
    mock = mock.filter((p) => p.id !== id)
    return null
  }
  return request(`${RUTA}/${id}`, { method: 'DELETE' })
}