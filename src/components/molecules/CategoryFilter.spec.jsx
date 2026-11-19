import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoryFilter from './CategoryFilter'

describe('Molecule: CategoryFilter', () => {
  it('13. llama a onChange (spy) con la categoría elegida y con vacío en "Todas"', async () => {
    const onChange = jasmine.createSpy('onChange')
    render(<CategoryFilter categorias={['Armas', 'Mods']} value="" onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: 'Mods' }))
    expect(onChange).toHaveBeenCalledWith('Mods')

    await userEvent.click(screen.getByRole('button', { name: 'Todas' }))
    expect(onChange).toHaveBeenCalledWith('')
  })
})
