const aBase64Url = (objeto) => {
  const bytes = new TextEncoder().encode(JSON.stringify(objeto))
  let binario = ''
  bytes.forEach((b) => { binario += String.fromCharCode(b) })
  return btoa(binario).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const desdeBase64Url = (texto) => {
  const base64 = texto.replace(/-/g, '+').replace(/_/g, '/')
  const binario = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='))
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0))
  return JSON.parse(new TextDecoder().decode(bytes))
}

export function crearTokenMock(payload) {
  return `${aBase64Url({ alg: 'none', typ: 'JWT' })}.${aBase64Url(payload)}.mock`
}

export function leerToken(token) {
  try {
    const partes = token.split('.')
    if (partes.length < 2) return null
    return desdeBase64Url(partes[1])
  } catch {
    return null
  }
}

export function tokenExpirado(token, ahora = Date.now()) {
  if (!token) return true
  const payload = leerToken(token)
  if (!payload || typeof payload.exp !== 'number') return false
  return payload.exp * 1000 <= ahora
}
