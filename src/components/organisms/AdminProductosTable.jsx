import { Table } from 'react-bootstrap'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import Text from '../atoms/Text'
import { nivelStock } from '../../utils/productos'

const ETIQUETA_STOCK = { ok: '', bajo: 'Bajo', agotado: 'Agotado', desconocido: '' }

function AdminProductosTable({ productos, onEdit, onDelete }) {
  if (productos.length === 0) {
    return (
      <div className="panel-dark text-center">
        <Text className="mb-0">No hay productos que coincidan.</Text>
      </div>
    )
  }

  return (
    <div className="panel-dark admin-tabla">
      <Table responsive borderless variant="dark" className="align-middle mb-0">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => {
            const nivel = nivelStock(p.stock)
            return (
              <tr key={p.id}>
                <td>
                  <div className="admin-producto">
                    <Image src={p.imagen} alt={p.nombre} className="admin-thumb" />
                    <div>
                      <Text className="admin-producto__nombre">{p.nombre}</Text>
                      <Text className="admin-producto__desc">{p.descripcion}</Text>
                    </div>
                  </div>
                </td>
                <td>
                  {p.categoria?.nombre
                    ? <span className="item__categoria">{p.categoria.nombre}</span>
                    : '—'}
                </td>
                <td>
                  <span className={`admin-stock admin-stock--${nivel}`}>
                    {p.stock ?? '—'}
                    {ETIQUETA_STOCK[nivel] && ` · ${ETIQUETA_STOCK[nivel]}`}
                  </span>
                </td>
                <td className="admin-precio text-nowrap">{p.precio} Platinum</td>
                <td className="text-end text-nowrap">
                  <Button
                    size="sm"
                    variant="outline-info"
                    className="me-2"
                    aria-label={`Editar ${p.nombre}`}
                    onClick={() => onEdit(p)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    aria-label={`Eliminar ${p.nombre}`}
                    onClick={() => onDelete(p)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default AdminProductosTable
