import { Table } from 'react-bootstrap'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function AdminOrdenesTable({ ordenes, onView }) {
  if (ordenes.length === 0) {
    return (
      <div className="panel-dark text-center">
        <Text className="mb-0">No hay órdenes registradas.</Text>
      </div>
    )
  }

  return (
    <div className="panel-dark">
      <Table responsive hover variant="dark" className="align-middle mb-0">
        <thead>
          <tr>
            <th>N° Orden</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{new Date(o.fecha).toLocaleString('es-CL')}</td>
              <td>{o.correo}</td>
              <td>{o.total} Platinum</td>
              <td>
                <Button size="sm" variant="outline-info" onClick={() => onView(o)}>
                  Ver detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminOrdenesTable