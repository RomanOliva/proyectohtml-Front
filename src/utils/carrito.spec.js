import { agregarAlCarrito, calcularTotal, estadoStock } from './carrito'
import { productosDemo } from '../test/fixtures'

describe('Lógica: utils/carrito', () => {
  it('10. suma cantidades de un mismo producto sin mutar el original y calcula el total', () => {
    const inicial = agregarAlCarrito([], productosDemo[0])
    const conDos = agregarAlCarrito(inicial, productosDemo[0])
    const conOtro = agregarAlCarrito(conDos, productosDemo[1])

    expect(inicial[0].cantidad).toBe(1)   
    expect(conDos[0].cantidad).toBe(2)
    expect(calcularTotal(conOtro)).toBe(400) 
  })

  it('33. no permite agregar más unidades que el stock disponible', () => {
    const producto = { id: 9, nombre: 'Serration', precio: 20, stock: 2 }
    const uno = agregarAlCarrito([], producto)
    const dos = agregarAlCarrito(uno, producto)
    const tres = agregarAlCarrito(dos, producto)

    expect(dos[0].cantidad).toBe(2)
    expect(tres).toBe(dos)
    expect(estadoStock(producto, 1)).toBe('disponible')
    expect(estadoStock(producto, 2)).toBe('maximo')
    expect(estadoStock({ ...producto, stock: 0 })).toBe('agotado')
    expect(agregarAlCarrito([], { id: 1, nombre: 'Sin dato', precio: 1 }).length).toBe(1)
  })
})
