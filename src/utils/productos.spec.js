import {
  aPayloadProducto,
  extraerCategorias,
  filtrarAdmin,
  filtrarPorCategoria,
  nivelStock,
  normalizarProducto,
  resumenInventario,
} from './productos'

describe('Lógica: utils/productos', () => {
  const lista = [
    { id: 1, nombre: 'Volt', precio: 90, categoria: { id: 1, nombre: 'Warframes' } },
    { id: 2, nombre: 'Soma', precio: 60, categoria: { id: 2, nombre: 'Armas' } },
    { id: 3, nombre: 'Braton', precio: 40, categoria: { id: 2, nombre: 'Armas' } },
  ]

  it('11. normaliza campos del backend y acepta la categoría como texto', () => {
    const p = normalizarProducto({ id: 5, nombre: 'Serration', precio: '20', categoria: 'Mods', imagenUrl: 'x.jpg' })
    expect(p.precio).toBe(20)
    expect(p.imagen).toBe('x.jpg')
    expect(p.categoria.nombre).toBe('Mods')
    expect(p.descripcion).toBe('')
  })

  it('12. extrae categorías únicas y filtra por categoría', () => {
    expect(extraerCategorias(lista)).toEqual(['Warframes', 'Armas'])
    expect(filtrarPorCategoria(lista, 'Armas').length).toBe(2)
    expect(filtrarPorCategoria(lista, '').length).toBe(3)
  })
  it('16. calcula el resumen del inventario y el nivel de stock', () => {
    const inventario = [
      { id: 1, nombre: 'Volt', stock: 25, categoria: { id: 1, nombre: 'Warframes' } },
      { id: 2, nombre: 'Soma', stock: 5, categoria: { id: 2, nombre: 'Armas' } },
      { id: 3, nombre: 'Braton', stock: 0, categoria: { id: 2, nombre: 'Armas' } },
    ]
    expect(resumenInventario(inventario)).toEqual({ total: 3, categorias: 2, unidades: 30, stockBajo: 2 })
    expect(nivelStock(25)).toBe('ok')
    expect(nivelStock(5)).toBe('bajo')
    expect(nivelStock(0)).toBe('agotado')
    expect(nivelStock(null)).toBe('desconocido')
  })

  it('17. filtra en el admin por texto y categoría, y arma el payload para la API', () => {
    expect(filtrarAdmin(lista, 'so', '').length).toBe(1)
    expect(filtrarAdmin(lista, '', 'Armas').length).toBe(2)
    expect(filtrarAdmin(lista, 'brat', 'Armas').length).toBe(1)

    const payload = aPayloadProducto({
      nombre: ' Volt ', descripcion: ' Rápido ', precio: 90, stock: 3, imagen: '', categoriaId: 1,
    })
    expect(payload.nombre).toBe('Volt')
    expect(payload.categoria).toEqual({ id: 1 })
    expect(payload.categoriaId).toBe(1)
  })
})
