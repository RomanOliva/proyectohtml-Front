import { Alert, Container, Spinner } from 'react-bootstrap'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'
import ProductList from '../components/organisms/ProductList'
import useProductos from '../hooks/useProductos'
import { usarMock } from '../services/api'

export default function Productos({ onAdd }) {
  const { productos, cargando, error, reintentar } = useProductos()

  return (
    <Container>
      <h1 className="parodia">Basura Ki'teer</h1>

      {usarMock() && (
        <Alert variant="warning" className="text-center">
          Modo demostración: mostrando datos locales sin conexión al servidor.
        </Alert>
      )}

      {cargando && (
        <div className="panel-dark text-center estado-carga" role="status">
          <Spinner animation="border" variant="info" className="mb-3" />
          <Text className="mb-0">
            Cargando productos... si el servidor estaba dormido puede tardar unos segundos.
          </Text>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          <p className="mb-2">{error}</p>
          <Button variant="outline-danger" size="sm" onClick={reintentar}>Reintentar</Button>
        </Alert>
      )}

      {!cargando && !error && <ProductList productos={productos} onAdd={onAdd} />}
    </Container>
  )
}
