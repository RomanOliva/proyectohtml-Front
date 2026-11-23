export function cantidadEnCarrito(carrito, id) {
  return carrito.find((item) => item.id === id)?.cantidad ?? 0
}

export function estadoStock(producto, enCarrito = 0) {
  if (typeof producto.stock !== 'number') return 'disponible'
  if (producto.stock <= 0) return 'agotado'
  if (enCarrito >= producto.stock) return 'maximo'
  return 'disponible'
}

export function agregarAlCarrito(carrito, producto) {
  if (estadoStock(producto, cantidadEnCarrito(carrito, producto.id)) !== 'disponible') return carrito
  const existe = carrito.find((item) => item.id === producto.id)
  if (existe) {
    return carrito.map((item) =>
      item.id === producto.id ? { ...item, cantidad: item.cantidad + 1, stock: producto.stock } : item
    )
  }
  return [...carrito, { ...producto, cantidad: 1 }]
}

export function quitarDelCarrito(carrito, id) {
  return carrito.filter((item) => item.id !== id)
}

export function calcularTotal(carrito) {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0)
}

export function contarItems(carrito) {
  return carrito.reduce((total, item) => total + item.cantidad, 0)
}

export function filtrarProductos(productos, texto) {
  const busqueda = texto.trim().toLowerCase()
  if (busqueda === '') return productos
  return productos.filter((p) => p.nombre.toLowerCase().includes(busqueda))
}

export function armarDetalles(carrito) {
  return carrito.map((item) => ({ productoId: item.id, cantidad: item.cantidad }))
}
