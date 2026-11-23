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
    imagen: p.imagen || p.imagenUrl || p.urlImagen || ruta('imagenes/logo.webp'),
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

export function normalizarCategoria(c) {
  return typeof c === 'string' ? { id: null, nombre: c } : { id: c.id, nombre: c.nombre }
}

export function aPayloadProducto(datos) {
  return {
    nombre: datos.nombre.trim(),
    descripcion: datos.descripcion.trim(),
    precio: datos.precio,
    stock: datos.stock,
    imagen: datos.imagen.trim(),
    categoriaId: datos.categoriaId,
    categoria: { id: datos.categoriaId },
  }
}

export function resumenInventario(productos, umbralBajo = 10) {
  return {
    total: productos.length,
    categorias: extraerCategorias(productos).length,
    unidades: productos.reduce((suma, p) => suma + (typeof p.stock === 'number' ? p.stock : 0), 0),
    stockBajo: productos.filter((p) => typeof p.stock === 'number' && p.stock <= umbralBajo).length,
  }
}

export function filtrarAdmin(productos, texto, categoria) {
  const busqueda = texto.trim().toLowerCase()
  return filtrarPorCategoria(productos, categoria).filter(
    (p) => busqueda === '' || p.nombre.toLowerCase().includes(busqueda)
  )
}

export function nivelStock(stock, umbralBajo = 10) {
  if (typeof stock !== 'number') return 'desconocido'
  if (stock <= 0) return 'agotado'
  if (stock <= umbralBajo) return 'bajo'
  return 'ok'
}
