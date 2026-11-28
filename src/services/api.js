export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
export const USAR_MOCK = import.meta.env.VITE_USAR_MOCK !== 'false'

export async function request(ruta, { method = 'GET', body } = {}) {
  const token = localStorage.getItem('token')

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status}`
    try {
      const error = await respuesta.json()
      if (error.mensaje) mensaje = error.mensaje
      if (error.detalles?.length) mensaje += `: ${error.detalles.join(', ')}`
    } catch {
      // la respuesta de error no traía JSON
    }
    throw new Error(mensaje)
  }

  return respuesta.status === 204 ? null : respuesta.json()
}