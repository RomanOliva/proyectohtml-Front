import { Card } from 'react-bootstrap'
import Button from '../atoms/Button'
import Image from '../atoms/Image'
import CardBody from '../molecules/CardBody'
import { estadoStock } from '../../utils/carrito'

const TEXTO_BOTON = {
  disponible: 'Agregar al carrito',
  maximo: 'Máximo en el carrito',
  agotado: 'Agotado',
}

function ProductCard({ producto, onAdd, enCarrito = 0 }) {
  const estado = estadoStock(producto, enCarrito)

  return (
    <Card className="item h-100">
      <Image src={producto.imagen} alt={producto.nombre} className="card-img-top" />
      <Card.Body className="d-flex flex-column">
        <CardBody
          title={producto.nombre}
          price={producto.precio}
          category={producto.categoria?.nombre}
          description={producto.descripcion}
          stock={producto.stock}
        />
        <Button
          variant="info"
          className="mt-auto"
          disabled={estado !== 'disponible'}
          onClick={() => onAdd(producto)}
        >
          {TEXTO_BOTON[estado]}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard
