const BASE_URL = (import.meta.env?.VITE_API_URL ?? '').replace(/\/$/, '')

export const usarMock = () => import.meta.env?.VITE_USE_MOCK === 'true' || BASE_URL === ''

export class ApiError extends Error {
  constructor(mensaje, estado) {
    super(mensaje)
    this.name = 'ApiError'
    this.estado = estado
  }
}

async function leerMensaje(res) {
  try {
    const datos = await res.json()
    return datos.message ?? datos.mensaje ?? datos.error ?? `Error ${res.status}`
  } catch {
    return `Error ${res.status}`
  }
}

export async function api(path, { method = 'GET', body, auth = true, signal } = {}) {
  const headers = { Accept: 'application/json' }
  if (body !== undefined) headers['Content-Type'] = 'application/json'

  const token = localStorage.getItem('token')
  if (auth && token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('No se pudo conectar con el servidor.', 0)
  }

  if (!res.ok) throw new ApiError(await leerMensaje(res), res.status)
  return res.status === 204 ? null : res.json()
}
