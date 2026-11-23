import { Spinner } from 'react-bootstrap'
import Text from '../atoms/Text'

function EstadoCarga({ mensaje }) {
  return (
    <div className="panel-dark text-center estado-carga" role="status">
      <Spinner animation="border" variant="info" className="mb-3" />
      <Text className="mb-0">{mensaje}</Text>
    </div>
  )
}

export default EstadoCarga
