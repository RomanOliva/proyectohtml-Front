import { leerToken } from './jwt'

export const ROLES = {
  ADMIN: 'ADMIN',
  VENDEDOR: 'VENDEDOR',
  CLIENTE: 'CLIENTE',
}

export function normalizarRol(rol) {
  const valor = Array.isArray(rol) ? rol[0] : rol
  const texto = typeof valor === 'object' && valor !== null ? valor.authority : valor
  if (!texto) return null
  return String(texto).toUpperCase().replace(/^ROLE_/, '')
}

export function crearSesion(datos, correoRespaldo = '') {
  const token = datos?.token ?? datos?.accessToken ?? datos?.jwt
  if (!token) throw new Error('La respuesta del servidor no incluye un token.')

  const claims = leerToken(token) ?? {}
  const rol = normalizarRol(
    datos.rol ?? datos.role ?? claims.rol ?? claims.role ?? claims.roles ?? claims.authorities
  )

  return {
    token,
    usuario: {
      correo: datos.correo ?? datos.email ?? claims.sub ?? correoRespaldo,
      rol: rol ?? ROLES.CLIENTE,
    },
  }
}
