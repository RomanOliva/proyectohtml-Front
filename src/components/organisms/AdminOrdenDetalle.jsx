import { Modal, Table } from 'react-bootstrap'
import Button from '../atoms/Button'

function AdminOrdenDetalle({ orden, onClose }) {
  if (!orden) return null

  return (
    <Modal show onHide={onClose} centered size="lg" data-bs-theme="dark">
      <Modal.Header closeButton>
        <Modal.Title>Orden #{orden.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="mb-1">
          <strong>Fecha:</strong> {new Date(orden.fecha).toLocaleString('es-CL')}
        </p>
        <p>
          <strong>Cliente:</strong> {orden.correo}
        </p>

        <Table responsive className="align-middle">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.detalles.map((d) => (
              <tr key={d.productoId}>
                <td>{d.nombre}</td>
                <td>{d.precioUnitario} Platinum</td>
                <td>{d.cantidad}</td>
                <td>{d.subtotal} Platinum</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <p className="text-end mb-0">
          <strong>Total: {orden.total} Platinum</strong>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdminOrdenDetalle