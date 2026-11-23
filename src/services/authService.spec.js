import { leerToken } from '../utils/jwt'
import { iniciarSesion, registrarUsuario } from './authService'

describe('Servicio: authService (modo demostración)', () => {
  beforeEach(() => localStorage.removeItem('usuarios_mock'))

  it('24. el administrador de demostración inicia sesión y recibe un token con rol ADMIN', async () => {
    const { token, usuario } = await iniciarSesion({ correo: 'ADMIN@warframe.cl', password: 'Admin123' })
    expect(usuario).toEqual({ correo: 'admin@warframe.cl', rol: 'ADMIN' })
    expect(leerToken(token).rol).toBe('ADMIN')
  })

  it('25. un usuario registrado puede entrar como CLIENTE y no se permite duplicarlo', async () => {
    await registrarUsuario({ correo: 'Nuevo@gmail.com', password: 'secreto1' })

    const { usuario } = await iniciarSesion({ correo: 'nuevo@gmail.com', password: 'secreto1' })
    expect(usuario.rol).toBe('CLIENTE')

    await expectAsync(registrarUsuario({ correo: 'nuevo@gmail.com', password: 'otra123' }))
      .toBeRejectedWithError('Ese correo ya está registrado.')
  })

  it('26. rechaza credenciales incorrectas', async () => {
    await expectAsync(iniciarSesion({ correo: 'admin@warframe.cl', password: 'mala' }))
      .toBeRejectedWithError('Correo o contraseña incorrectos.')
  })
})
