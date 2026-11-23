import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CartCheckout from './CartCheckout'

const montar = (props) => render(<MemoryRouter><CartCheckout {...props} /></MemoryRouter>)

describe('Organism: CartCheckout', () => {
  it('30. sin sesión no ofrece comprar y pide iniciar sesión o crear cuenta', () => {
    montar({ autenticado: false, onCheckout: () => {} })

    expect(screen.queryByRole('button', { name: 'Finalizar compra' })).toBeNull()
    expect(screen.getByRole('link', { name: 'Iniciar sesión para comprar' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Crear cuenta' })).toBeTruthy()
  })

  it('31. con sesión permite finalizar la compra y muestra errores', async () => {
    const onCheckout = jasmine.createSpy('onCheckout')
    montar({ autenticado: true, error: 'Sin stock suficiente.', onCheckout })

    expect(screen.getByText('Sin stock suficiente.')).toBeTruthy()
    await userEvent.click(screen.getByRole('button', { name: 'Finalizar compra' }))
    expect(onCheckout).toHaveBeenCalled()
  })
})
