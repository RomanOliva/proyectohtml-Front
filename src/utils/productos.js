import { ruta } from './ruta'

export function normalizarProducto(p) {
  const categoria = typeof p.categoria === 'string'
    ? { id: null, nombre: p.categoria }
    : p.categoria ?? null

  return {
    id: p.id,
    nombre: p.nombre,
    descripcion: p.descripcion ?? '',
    precio: Number(p.precio),
    stock: p.stock ?? null,
    imagen: p.imagen ?? p.imagenUrl ?? p.urlImagen ?? ruta('imagenes/logo.webp'),
    categoria,
  }
}

export function extraerCategorias(productos) {
  const nombres = productos.map((p) => p.categoria?.nombre).filter(Boolean)
  return [...new Set(nombres)]
}

export function filtrarPorCategoria(productos, categoria) {
  if (!categoria) return productos
  return productos.filter((p) => p.categoria?.nombre === categoria)
}
