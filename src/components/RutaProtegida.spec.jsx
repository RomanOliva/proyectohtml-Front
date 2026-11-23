import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import RutaProtegida from './RutaProtegida'

function montar(usuario) {
  render(
    <AuthContext.Provider value={{ usuario }}>
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route path="/" element={<p>Pantalla inicio</p>} />
          <Route path="/login" element={<p>Pantalla login</p>} />
          <Route
            path="/admin"
            element={<RutaProtegida roles={['ADMIN']}><p>Panel admin</p></RutaProtegida>}
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  )
}

describe('Componente: RutaProtegida', () => {
  it('27. sin sesión redirige al login', () => {
    montar(null)
    expect(screen.getByText('Pantalla login')).toBeTruthy()
  })

  it('28. un cliente no entra al admin y vuelve al inicio', () => {
    montar({ correo: 'c@gmail.com', rol: 'CLIENTE' })
    expect(screen.getByText('Pantalla inicio')).toBeTruthy()
    expect(screen.queryByText('Panel admin')).toBeNull()
  })

  it('29. un administrador sí ve el panel', () => {
    montar({ correo: 'admin@warframe.cl', rol: 'ADMIN' })
    expect(screen.getByText('Panel admin')).toBeTruthy()
  })
})
