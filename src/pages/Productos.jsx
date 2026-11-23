import { Alert, Container } from 'react-bootstrap'
import EstadoCarga from '../components/molecules/EstadoCarga'
import EstadoError from '../components/molecules/EstadoError'
import ProductList from '../components/organisms/ProductList'
import useProductos from '../hooks/useProductos'
import { usarMock } from '../services/api'

export default function Productos({ onAdd, carrito }) {
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
        <EstadoCarga mensaje="Cargando productos... si el servidor estaba dormido puede tardar unos segundos." />
      )}

      {error && <EstadoError mensaje={error} onRetry={reintentar} />}

      {!cargando && !error && <ProductList productos={productos} onAdd={onAdd} carrito={carrito} />}
    </Container>
  )
}
