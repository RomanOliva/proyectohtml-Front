import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RegisterForm from './RegisterForm'

describe('Organism: RegisterForm', () => {
  it('9. rechaza correos que no sean @gmail.com', async () => {
    render(<MemoryRouter><RegisterForm /></MemoryRouter>)

    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'a@hotmail.com')
    await userEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    expect(await screen.findByText('El correo debe ser una cuenta de @gmail.com')).toBeTruthy()
  })

  it('19. envía el correo en minúsculas y muestra el error si el correo ya existe', async () => {
    const onRegister = jasmine.createSpy('onRegister').and.rejectWith(new Error('Ese correo ya está registrado.'))
    render(<MemoryRouter><RegisterForm onRegister={onRegister} /></MemoryRouter>)

    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'Nuevo@Gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'secreto1')
    await userEvent.type(screen.getByLabelText('Confirmar contraseña'), 'secreto1')
    await userEvent.click(screen.getByRole('button', { name: 'Registrarse' }))

    expect(await screen.findByText('Ese correo ya está registrado.')).toBeTruthy()
    expect(onRegister).toHaveBeenCalledWith({ correo: 'nuevo@gmail.com', password: 'secreto1' })
  })
})
