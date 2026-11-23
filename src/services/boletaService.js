import { armarDetalles, calcularTotal } from '../utils/carrito'
import { api, ApiError, usarMock } from './api'
import { descontarStockMock } from './productoService'

const CLAVE_BOLETAS = 'boletas_mock'

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function leerBoletas() {
  try {
    const guardadas = JSON.parse(localStorage.getItem(CLAVE_BOLETAS))
    return Array.isArray(guardadas) ? guardadas : []
  } catch {
    return []
  }
}

function normalizarBoleta(b) {
  return {
    id: b.id ?? b.numero ?? b.idBoleta,
    total: Number(b.total),
    fecha: b.fecha ?? new Date().toISOString(),
  }
}

export async function crearBoleta(carrito) {
  if (carrito.length === 0) throw new ApiError('El carrito está vacío.', 400)

  if (usarMock()) {
    await esperar(600)
    const usuario = JSON.parse(localStorage.getItem('usuario') ?? 'null')
    if (!localStorage.getItem('token') || !usuario) {
      throw new ApiError('Debes iniciar sesión para comprar.', 401)
    }
    const detalles = armarDetalles(carrito)
    descontarStockMock(detalles)
    const boletas = leerBoletas()
    const boleta = {
      id: boletas.length + 1,
      correo: usuario.correo,
      fecha: new Date().toISOString(),
      total: calcularTotal(carrito),
      detalles,
    }
    localStorage.setItem(CLAVE_BOLETAS, JSON.stringify([...boletas, boleta]))
    return normalizarBoleta(boleta)
  }

  const datos = await api('/boletas', { method: 'POST', body: { detalles: armarDetalles(carrito) } })
  return normalizarBoleta(datos ?? {})
}
