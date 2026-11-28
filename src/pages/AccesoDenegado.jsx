import { Container } from 'react-bootstrap'
import Link from '../components/atoms/Link'
import Text from '../components/atoms/Text'

export default function AccesoDenegado() {
  return (
    <Container>
      <h1 className="parodia">Acceso denegado</h1>
      <div className="panel-dark p-4 text-center">
        <Text>No tienes permisos para ver esta página.</Text>
        <Link to="/">Volver al inicio</Link>
      </div>
    </Container>
  )
}