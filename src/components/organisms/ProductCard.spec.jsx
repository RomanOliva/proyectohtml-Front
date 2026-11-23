import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductCard from './ProductCard'
import { productosDemo } from '../../test/fixtures'

describe('Organism: ProductCard', () => {
  it('5. muestra los datos recibidos por props y llama a onAdd con el producto', async () => {
    const onAdd = jasmine.createSpy('onAdd')
    render(<ProductCard producto={productosDemo[0]} onAdd={onAdd} />)

    expect(screen.getByRole('heading', { name: 'Item 1' })).toBeTruthy()
    expect(screen.getByText('Precio: 100 Platinum')).toBeTruthy()

    await userEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
    expect(onAdd).toHaveBeenCalledWith(productosDemo[0])
  })

  it('34. deshabilita el botón si el producto está agotado o ya está todo el stock en el carrito', () => {
    const { rerender } = render(<ProductCard producto={{ ...productosDemo[0], stock: 0 }} onAdd={() => {}} />)
    expect(screen.getByRole('button', { name: 'Agotado' }).disabled).toBe(true)

    rerender(<ProductCard producto={{ ...productosDemo[0], stock: 2 }} enCarrito={2} onAdd={() => {}} />)
    expect(screen.getByRole('button', { name: 'Máximo en el carrito' }).disabled).toBe(true)
    expect(screen.getByText('Disponibles: 2')).toBeTruthy()
  })
})
