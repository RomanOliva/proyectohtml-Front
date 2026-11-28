import { useCallback, useEffect, useMemo, useState } from 'react'
import { login as loginApi } from '../services/authService'
import { decodificarToken } from '../utils/token'
import { AuthContext } from './authContext'

const CLAVE = 'token'

// Lee el token guardado y arma la sesion. Sino devuelve null.
function leerSesion() {
  try {
    const token = localStorage.getItem(CLAVE)
    if (!token) return null
    const datos = decodificarToken(token)
    if (!datos || !datos.exp || datos.exp * 1000 <= Date.now()) {
      localStorage.removeItem(CLAVE)
      return null
    }
    return { correo: datos.sub, rol: datos.rol, exp: datos.exp }
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  // Se ejecuta una sola vez al cargar la página: así la sesión sobrevive a un F5
  const [sesion, setSesion] = useState(leerSesion)

  const cerrarSesion = useCallback(() => {
    try {
      localStorage.removeItem(CLAVE)
    } catch {
      // sin acceso al almacenamiento
    }
    setSesion(null)
  }, [])

  const iniciarSesion = useCallback(async (correo, password) => {
    const { token } = await loginApi(correo, password)
    localStorage.setItem(CLAVE, token)
    const nueva = leerSesion()
    if (!nueva) throw new Error('El servidor devolvió un token inválido.')
    setSesion(nueva)
    return nueva
  }, [])

  // Cierra la sesion sola cuando el token vence
  useEffect(() => {
    if (!sesion) return undefined
    const id = setTimeout(cerrarSesion, sesion.exp * 1000 - Date.now())
    return () => clearTimeout(id)
  }, [sesion, cerrarSesion])

  const valor = useMemo(
    () => ({
      usuario: sesion ? { correo: sesion.correo, rol: sesion.rol } : null,
      estaAutenticado: sesion !== null,
      tieneRol: (...roles) => sesion !== null && roles.includes(sesion.rol),
      iniciarSesion,
      cerrarSesion,
    }),
    [sesion, iniciarSesion, cerrarSesion]
  )

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}