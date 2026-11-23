import { crearBoleta } from './boletaService'
import { listarProductos } from './productoService'

const carrito = [
  { id: 3, nombre: 'Soma Prime', precio: 60, cantidad: 2 },
  { id: 5, nombre: 'Serration', precio: 20, cantidad: 1 },
]

describe('Servicio: boletaService (modo demostración)', () => {
  beforeEach(() => {
    localStorage.removeItem('boletas_mock')
    localStorage.removeItem('productos_mock_v1')
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
  })

  it('32. rechaza la compra sin sesión y la registra con sesión calculando el total', async () => {
    await expectAsync(crearBoleta(carrito)).toBeRejectedWithError('Debes iniciar sesión para comprar.')

    localStorage.setItem('token', 'x.y.z')
    localStorage.setItem('usuario', JSON.stringify({ correo: 'c@gmail.com', rol: 'CLIENTE' }))
    const boleta = await crearBoleta(carrito)
    expect(boleta.id).toBe(1)
    expect(boleta.total).toBe(140)

    await expectAsync(crearBoleta([])).toBeRejectedWithError('El carrito está vacío.')
  })

  it('35. la compra descuenta el stock y rechaza cantidades mayores a las disponibles', async () => {
    localStorage.setItem('token', 'x.y.z')
    localStorage.setItem('usuario', JSON.stringify({ correo: 'c@gmail.com', rol: 'CLIENTE' }))

    const antes = (await listarProductos()).find((p) => p.id === 3).stock
    await crearBoleta([{ id: 3, nombre: 'Soma Prime', precio: 60, cantidad: 2 }])
    const despues = (await listarProductos()).find((p) => p.id === 3).stock
    expect(despues).toBe(antes - 2)

    await expectAsync(crearBoleta([{ id: 3, nombre: 'Soma Prime', precio: 60, cantidad: despues + 1 }]))
      .toBeRejectedWithError(/Stock insuficiente de «Soma Prime»/)
    expect((await listarProductos()).find((p) => p.id === 3).stock).toBe(despues)
  })
})
