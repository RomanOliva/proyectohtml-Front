import { useEffect, useState } from 'react'
import { listarCategorias } from '../services/productoService'

export default function useCategorias() {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    const control = new AbortController()
    listarCategorias({ signal: control.signal })
      .then(setCategorias)
      .catch(() => {})
    return () => control.abort()
  }, [])

  return categorias
}
