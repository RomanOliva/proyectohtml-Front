import { categoriasMock, productosMock } from '../data/productosMock'
import { aPayloadProducto, normalizarCategoria, normalizarProducto } from '../utils/productos'
import { api, ApiError, usarMock } from './api'

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const comoLista = (datos) => (Array.isArray(datos) ? datos : datos?.content ?? [])

const CLAVE_ALMACEN = 'productos_mock_v1'

function leerAlmacen() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_ALMACEN))
    if (Array.isArray(guardado)) return guardado
  } catch {
    /* sin datos guardados: se usa la semilla */
  }
  return productosMock.map((p) => ({ ...p }))
}

const guardarAlmacen = (lista) => localStorage.setItem(CLAVE_ALMACEN, JSON.stringify(lista))

const buscarCategoria = (id) => categoriasMock.find((c) => c.id === Number(id)) ?? null

export async function listarProductos({ signal } = {}) {
  if (usarMock()) {
    await esperar(500)
    return leerAlmacen().map(normalizarProducto)
  }
  const datos = await api('/productos', { auth: false, signal })
  return comoLista(datos).map(normalizarProducto)
}

export async function obtenerProducto(id, { signal } = {}) {
  if (usarMock()) {
    await esperar(300)
    const encontrado = leerAlmacen().find((p) => p.id === Number(id))
    if (!encontrado) throw new ApiError('Producto no encontrado.', 404)
    return normalizarProducto(encontrado)
  }
  return normalizarProducto(await api(`/productos/${id}`, { auth: false, signal }))
}

export async function listarCategorias({ signal } = {}) {
  if (usarMock()) {
    await esperar(200)
    return categoriasMock.map(normalizarCategoria)
  }
  const datos = await api('/categorias', { auth: false, signal })
  return comoLista(datos).map(normalizarCategoria)
}

export async function crearProducto(datos) {
  if (usarMock()) {
    await esperar(400)
    const almacen = leerAlmacen()
    const nuevo = {
      ...datos,
      id: almacen.reduce((max, p) => Math.max(max, p.id), 0) + 1,
      categoria: buscarCategoria(datos.categoriaId),
    }
    guardarAlmacen([...almacen, nuevo])
    return normalizarProducto(nuevo)
  }
  return normalizarProducto(await api('/productos', { method: 'POST', body: aPayloadProducto(datos) }))
}

export async function actualizarProducto(id, datos) {
  if (usarMock()) {
    await esperar(400)
    const actualizado = { ...datos, id, categoria: buscarCategoria(datos.categoriaId) }
    guardarAlmacen(leerAlmacen().map((p) => (p.id === id ? actualizado : p)))
    return normalizarProducto(actualizado)
  }
  return normalizarProducto(
    await api(`/productos/${id}`, { method: 'PUT', body: aPayloadProducto(datos) })
  )
}

export async function eliminarProducto(id) {
  if (usarMock()) {
    await esperar(400)
    guardarAlmacen(leerAlmacen().filter((p) => p.id !== id))
    return null
  }
  return api(`/productos/${id}`, { method: 'DELETE' })
}

export function descontarStockMock(detalles) {
  const almacen = leerAlmacen()

  detalles.forEach(({ productoId, cantidad }) => {
    const producto = almacen.find((p) => p.id === productoId)
    if (!producto) throw new ApiError('Un producto de tu carrito ya no existe.', 404)
    if (typeof producto.stock === 'number' && cantidad > producto.stock) {
      const quedan = producto.stock === 1 ? 'queda 1 unidad' : `quedan ${producto.stock} unidades`
      throw new ApiError(`Stock insuficiente de «${producto.nombre}»: ${quedan}.`, 409)
    }
  })

  guardarAlmacen(
    almacen.map((p) => {
      const detalle = detalles.find((d) => d.productoId === p.id)
      return detalle && typeof p.stock === 'number' ? { ...p, stock: p.stock - detalle.cantidad } : p
    })
  )
}
