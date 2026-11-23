import { crearTokenMock } from './jwt'
import { crearSesion, normalizarRol } from './sesion'

describe('Lógica: utils/sesion', () => {
  it('22. normaliza roles de distintos formatos que puede devolver el backend', () => {
    expect(normalizarRol('ROLE_ADMIN')).toBe('ADMIN')
    expect(normalizarRol('vendedor')).toBe('VENDEDOR')
    expect(normalizarRol([{ authority: 'ROLE_CLIENTE' }])).toBe('CLIENTE')
    expect(normalizarRol(undefined)).toBeNull()
  })

  it('23. arma la sesión leyendo rol y correo del token, y usa CLIENTE si no hay rol', () => {
    const conRol = crearSesion({ token: crearTokenMock({ sub: 'a@gmail.com', roles: ['ROLE_ADMIN'] }) })
    expect(conRol.usuario).toEqual({ correo: 'a@gmail.com', rol: 'ADMIN' })

    const sinRol = crearSesion({ token: crearTokenMock({ sub: 'b@gmail.com' }) })
    expect(sinRol.usuario.rol).toBe('CLIENTE')

    expect(() => crearSesion({})).toThrowError('La respuesta del servidor no incluye un token.')
  })
})
