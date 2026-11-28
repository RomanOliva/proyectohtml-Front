import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function RutaProtegida({ roles }) {
  const { estaAutenticado, tieneRol } = useAuth()

  if (!estaAutenticado) return <Navigate to="/login" replace />
  if (roles && !tieneRol(...roles)) return <Navigate to="/acceso-denegado" replace />

  return <Outlet />
}