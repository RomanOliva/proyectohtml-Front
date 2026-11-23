import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import RegisterForm from '../components/organisms/RegisterForm'
import useAuth from '../hooks/useAuth'

export default function Registro() {
  const { usuario, registrar } = useAuth()

  if (usuario) return <Navigate to="/" replace />

  return (
    <Container className="d-flex justify-content-center">
      <RegisterForm onRegister={registrar} />
    </Container>
  )
}
