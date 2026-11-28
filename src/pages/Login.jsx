import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/organisms/LoginForm'
import { useAuth } from '../context/authContext'

export default function Login() {
  const navigate = useNavigate()
  const { iniciarSesion } = useAuth()
  const [error, setError] = useState('')

  const entrar = async ({ correo, password }) => {
    try {
      setError('')
      const sesion = await iniciarSesion(correo, password)
      navigate(sesion.rol === 'CLIENTE' ? '/productos' : '/admin')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <Container className="d-flex justify-content-center">
      <LoginForm onLogin={entrar} error={error} />
    </Container>
  )
}