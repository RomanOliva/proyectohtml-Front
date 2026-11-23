import { useCallback, useEffect, useMemo, useState } from 'react'
import { iniciarSesion, registrarUsuario } from '../services/authService'
import { leerToken, tokenExpirado } from '../utils/jwt'
import { AuthContext } from './AuthContext'

const MAX_TIMEOUT = 2147483647

function limpiarSesion() {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}

function leerSesionGuardada() {
  try {
    const token = localStorage.getItem('token')
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if (!token || !usuario?.rol || tokenExpirado(token)) {
      limpiarSesion()
      return null
    }
    return usuario
  } catch {
    limpiarSesion()
    return null
  }
}

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesionGuardada)

  const logout = useCallback(() => {
    limpiarSesion()
    setUsuario(null)
  }, [])

  const login = useCallback(async (credenciales) => {
    const { token, usuario: nuevo } = await iniciarSesion(credenciales)
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', JSON.stringify(nuevo))
    setUsuario(nuevo)
    return nuevo
  }, [])

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout)
    return () => window.removeEventListener('sesion-expirada', logout)
  }, [logout])

  useEffect(() => {
    if (!usuario) return undefined
    const exp = leerToken(localStorage.getItem('token'))?.exp
    if (typeof exp !== 'number') return undefined
    const restante = Math.min(Math.max(exp * 1000 - Date.now(), 0), MAX_TIMEOUT)
    const temporizador = setTimeout(logout, restante)
    return () => clearTimeout(temporizador)
  }, [usuario, logout])

  const valor = useMemo(
    () => ({ usuario, login, logout, registrar: registrarUsuario }),
    [usuario, login, logout]
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}
