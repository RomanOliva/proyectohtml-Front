import { useEffect, useState } from 'react'
import { listarProductos } from '../services/productoService'

export default function useProductos() {
  const [estado, setEstado] = useState({ productos: [], cargando: true, error: null })
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const control = new AbortController()
    setEstado((e) => ({ ...e, cargando: true, error: null }))

    listarProductos({ signal: control.signal })
      .then((productos) => setEstado({ productos, cargando: false, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setEstado({ productos: [], cargando: false, error: err.message })
      })

    return () => control.abort()
  }, [intento])

  const modificar = (fn) => setEstado((e) => ({ ...e, productos: fn(e.productos) }))

  return { ...estado, reintentar: () => setIntento((n) => n + 1), modificar }
}
