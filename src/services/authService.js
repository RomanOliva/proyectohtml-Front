import { crearTokenMock } from '../utils/jwt'
import { crearSesion, ROLES } from '../utils/sesion'
import { api, ApiError, usarMock } from './api'

const CLAVE_USUARIOS = 'usuarios_mock'
const VIDA_TOKEN_MOCK_SEGUNDOS = 60 * 60

const ADMIN_MOCK = { correo: 'admin@warframe.cl', password: 'Admin123', rol: ROLES.ADMIN }

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const normalizarCorreo = (correo) => correo.trim().toLowerCase()

function leerRegistrados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_USUARIOS))
    return Array.isArray(guardados) ? guardados : []
  } catch {
    return []
  }
}

const todosLosUsuarios = () => [ADMIN_MOCK, ...leerRegistrados()]

export async function iniciarSesion({ correo, password }) {
  const correoNormal = normalizarCorreo(correo)

  if (usarMock()) {
    await esperar(400)
    const usuario = todosLosUsuarios().find(
      (u) => u.correo === correoNormal && u.password === password
    )
    if (!usuario) throw new ApiError('Correo o contraseña incorrectos.', 401)

    const ahora = Math.floor(Date.now() / 1000)
    const token = crearTokenMock({
      sub: usuario.correo,
      rol: usuario.rol,
      iat: ahora,
      exp: ahora + VIDA_TOKEN_MOCK_SEGUNDOS,
    })
    return crearSesion({ token, rol: usuario.rol, correo: usuario.correo })
  }

  const datos = await api('/auth/login', {
    method: 'POST',
    body: { correo: correoNormal, password },
    auth: false,
  })
  return crearSesion(datos, correoNormal)
}

export async function registrarUsuario({ correo, password }) {
  const correoNormal = normalizarCorreo(correo)

  if (usarMock()) {
    await esperar(400)
    if (todosLosUsuarios().some((u) => u.correo === correoNormal)) {
      throw new ApiError('Ese correo ya está registrado.', 409)
    }
    const nuevo = { correo: correoNormal, password, rol: ROLES.CLIENTE }
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify([...leerRegistrados(), nuevo]))
    return null
  }

  return api('/auth/register', {
    method: 'POST',
    body: { correo: correoNormal, password },
    auth: false,
  })
}
