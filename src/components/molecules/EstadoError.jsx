import { Alert } from 'react-bootstrap'
import Button from '../atoms/Button'

function EstadoError({ mensaje, onRetry }) {
  return (
    <Alert variant="danger" className="text-center">
      <p className="mb-2">{mensaje}</p>
      <Button variant="outline-danger" size="sm" onClick={onRetry}>Reintentar</Button>
    </Alert>
  )
}

export default EstadoError
