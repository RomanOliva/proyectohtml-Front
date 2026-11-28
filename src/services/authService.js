import { request, USAR_MOCK } from './api'

// Usuarios de prueba, solo para cuando VITE_USAR_MOCK=true
const usuariosMock = [
  { correo: 'admin@test.cl', password: 'admin123', rol: 'ADMIN' },
  { correo: 'vendedor@test.cl', password: 'vendedor123', rol: 'VENDEDOR' },
  { correo: 'cliente@test.cl', password: 'cliente123', rol: 'CLIENTE' },
]

function base64url(objeto) {
  return btoa(JSON.stringify(objeto)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

// Token falso con la misma forma que el del backend (dura 1 hora)
function crearTokenMock(correo, rol) {
  const exp = Math.floor(Date.now() / 1000) + 3600
  return `${base64url({ alg: 'none' })}.${base64url({ sub: correo, rol, exp })}.mock`
}

export async function login(correo, password) {
  if (USAR_MOCK) {
    const usuario = usuariosMock.find(
      (u) => u.correo === correo.trim().toLowerCase() && u.password === password
    )
    if (!usuario) throw new Error('Correo o contraseña incorrectos.')
    return {
      token: crearTokenMock(usuario.correo, usuario.rol),
      correo: usuario.correo,
      rol: usuario.rol,
    }
  }
  return request('/api/v1/auth/login', { method: 'POST', body: { correo, password } })
}

export async function registrar(correo, password) {
  if (USAR_MOCK) {
    const normal = correo.trim().toLowerCase()
    if (usuariosMock.some((u) => u.correo === normal)) {
      throw new Error('Ese correo ya está registrado.')
    }
    usuariosMock.push({ correo: normal, password, rol: 'CLIENTE' })
    return { correo: normal, rol: 'CLIENTE' }
  }
  return request('/api/v1/auth/register', { method: 'POST', body: { correo, password } })
}