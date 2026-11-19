import { extraerCategorias, filtrarPorCategoria, normalizarProducto } from './productos'

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
})
