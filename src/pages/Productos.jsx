import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Text from '../components/atoms/Text'
import ProductList from '../components/organisms/ProductList'
import { listarProductos } from '../services/productosService'

export default function Productos({ onAdd }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargar() {
      try {
        setProductos(await listarProductos())
      } catch (e) {
        setError(`No se pudieron cargar los productos: ${e.message}`)
      } finally {
        setCargando(false)
      }
    }
    cargar()
  }, [])

  return (
    <Container>
      <h1 className="parodia">Basura Ki'teer</h1>
      {cargando && <Text className="text-center text-white">Cargando productos...</Text>}
      {error && <Text className="text-center text-danger">{error}</Text>}
      {!cargando && !error && <ProductList productos={productos} onAdd={onAdd} />}
    </Container>
  )
}