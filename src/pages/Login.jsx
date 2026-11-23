import { Alert, Container } from 'react-bootstrap'
import { Navigate, useLocation } from 'react-router-dom'
import LoginForm from '../components/organisms/LoginForm'
import useAuth from '../hooks/useAuth'
import { usarMock } from '../services/api'

export default function Login() {
  const { usuario, login } = useAuth()
  const ubicacion = useLocation()

  if (usuario) {
    const destino = ubicacion.state?.desde ?? (usuario.rol === 'ADMIN' ? '/admin' : '/')
    return <Navigate to={destino} replace />
  }

  return (
    <Container className="d-flex flex-column align-items-center">
      {usarMock() && (
        <Alert variant="warning" className="text-center">
          Modo demostración. Administrador: admin@warframe.cl / Admin123
        </Alert>
      )}
      <LoginForm onLogin={login} />
    </Container>
  )
}
