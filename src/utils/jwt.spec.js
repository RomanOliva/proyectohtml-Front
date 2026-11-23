import { crearTokenMock, leerToken, tokenExpirado } from './jwt'

describe('Lógica: utils/jwt', () => {
  it('20. crea un token que se puede leer de vuelta, incluso con tildes', () => {
    const token = crearTokenMock({ sub: 'ñandú@gmail.com', rol: 'ADMIN', exp: 2000000000 })
    expect(token.split('.').length).toBe(3)
    expect(leerToken(token)).toEqual({ sub: 'ñandú@gmail.com', rol: 'ADMIN', exp: 2000000000 })
    expect(leerToken('no-es-un-token')).toBeNull()
  })

  it('21. detecta tokens expirados, vigentes y vacíos', () => {
    const ahora = 1700000000000
    const vigente = crearTokenMock({ exp: ahora / 1000 + 60 })
    const vencido = crearTokenMock({ exp: ahora / 1000 - 60 })
    expect(tokenExpirado(vigente, ahora)).toBe(false)
    expect(tokenExpirado(vencido, ahora)).toBe(true)
    expect(tokenExpirado('', ahora)).toBe(true)
  })
})
