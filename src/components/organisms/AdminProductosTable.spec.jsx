import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminProductosTable from './AdminProductosTable'
import { productosDemo } from '../../test/fixtures'

describe('Organism: AdminProductosTable', () => {
  it('14. muestra los productos y dispara onEdit/onDelete (spies) con el producto elegido', async () => {
    const onEdit = jasmine.createSpy('onEdit')
    const onDelete = jasmine.createSpy('onDelete')
    render(<AdminProductosTable productos={productosDemo} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText('Item 1')).toBeTruthy()

    await userEvent.click(screen.getByRole('button', { name: 'Editar Item 2' }))
    expect(onEdit).toHaveBeenCalledWith(productosDemo[1])

    await userEvent.click(screen.getByRole('button', { name: 'Eliminar Fish' }))
    expect(onDelete).toHaveBeenCalledWith(productosDemo[2])
  })

  it('15. muestra un mensaje cuando no hay productos', () => {
    render(<AdminProductosTable productos={[]} onEdit={() => {}} onDelete={() => {}} />)
    expect(screen.getByText('No hay productos que coincidan.')).toBeTruthy()
  })
})
