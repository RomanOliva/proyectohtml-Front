import { Container } from 'react-bootstrap'
import RegisterForm from '../components/organisms/RegisterForm'
import { registrar } from '../services/authService'

export default function Registro() {
  return (
    <Container className="d-flex justify-content-center">
      <RegisterForm onRegister={({ correo, password }) => registrar(correo, password)} />
    </Container>
  )
}