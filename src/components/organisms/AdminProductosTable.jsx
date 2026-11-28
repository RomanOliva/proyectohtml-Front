import { Table } from 'react-bootstrap'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import Text from '../atoms/Text'

function AdminProductosTable({ productos, onEdit, onDelete }) {
  if (productos.length === 0) {
    return (
      <div className="panel-dark text-center">
        <Text className="mb-0">No hay productos registrados.</Text>
      </div>
    )
  }

  return (
    <div className="panel-dark">
      <Table responsive hover variant="dark" className="align-middle mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <Image src={p.imagen} alt={p.nombre} className="admin-thumb" />
              </td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.categoria?.nombre}</td>
              <td>{p.precio} Platinum</td>
              <td>{p.stock}</td>
              <td className="text-nowrap">
                <Button size="sm" variant="outline-info" className="me-2" onClick={() => onEdit(p)}>
                  Editar
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(p.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminProductosTable