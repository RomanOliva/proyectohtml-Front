import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import LoginForm from './LoginForm'

describe('Organism: LoginForm', () => {
  it('8. muestra errores y NO envía el formulario si los campos están vacíos', async () => {
    const onLogin = jasmine.createSpy('onLogin')
    render(<MemoryRouter><LoginForm onLogin={onLogin} /></MemoryRouter>)

    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(await screen.findByText('Debes ingresar tu correo.')).toBeTruthy()
    expect(screen.getByText('Debes ingresar tu contraseña.')).toBeTruthy()
    expect(onLogin).not.toHaveBeenCalled()
  })

  it('18. muestra el mensaje del servidor cuando onLogin rechaza las credenciales', async () => {
    const onLogin = jasmine.createSpy('onLogin').and.rejectWith(new Error('Correo o contraseña incorrectos.'))
    render(<MemoryRouter><LoginForm onLogin={onLogin} /></MemoryRouter>)

    await userEvent.type(screen.getByLabelText('Correo electrónico'), 'alguien@gmail.com')
    await userEvent.type(screen.getByLabelText('Contraseña'), 'secreto1')
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(await screen.findByText('Correo o contraseña incorrectos.')).toBeTruthy()
    expect(onLogin).toHaveBeenCalledWith({ correo: 'alguien@gmail.com', password: 'secreto1' })
  })
})
