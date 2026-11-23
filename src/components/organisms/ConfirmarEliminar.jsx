import { Modal } from 'react-bootstrap'
import Button from '../atoms/Button'

function ConfirmarEliminar({ producto, eliminando, onConfirm, onCancel }) {
  return (
    <Modal
      show
      centered
      onHide={eliminando ? undefined : onCancel}
      backdrop={eliminando ? 'static' : true}
      contentClassName="modal-warframe"
    >
      <Modal.Header closeButton closeVariant="white" closeLabel="Cerrar">
        <Modal.Title>Eliminar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Seguro que quieres eliminar <strong>{producto.nombre}</strong>? Esta acción no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" disabled={eliminando} onClick={onCancel}>Cancelar</Button>
        <Button variant="danger" disabled={eliminando} onClick={onConfirm}>
          {eliminando ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmarEliminar
