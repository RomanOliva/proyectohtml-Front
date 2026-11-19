import { productosMock } from '../data/productosMock'
import { normalizarProducto } from '../utils/productos'
import { api, ApiError, usarMock } from './api'

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const comoLista = (datos) => (Array.isArray(datos) ? datos : datos?.content ?? [])

export async function listarProductos({ signal } = {}) {
  if (usarMock()) {
    await esperar(500)
    return productosMock.map(normalizarProducto)
  }
  const datos = await api('/productos', { auth: false, signal })
  return comoLista(datos).map(normalizarProducto)
}

export async function obtenerProducto(id, { signal } = {}) {
  if (usarMock()) {
    await esperar(300)
    const encontrado = productosMock.find((p) => p.id === Number(id))
    if (!encontrado) throw new ApiError('Producto no encontrado.', 404)
    return normalizarProducto(encontrado)
  }
  return normalizarProducto(await api(`/productos/${id}`, { auth: false, signal }))
}
