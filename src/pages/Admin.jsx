import { useState } from 'react'
import { Container } from 'react-bootstrap'
import AdminProductosTable from '../components/organisms/AdminProductosTable'
import { productos as productosIniciales } from '../data/productos'

export default function Admin() {
  const [productos, setProductos] = useState(productosIniciales)

  const eliminar = (id) => {
    setProductos((lista) => lista.filter((p) => p.id !== id))
  }

  const editar = (producto) => {
    console.log('Editar:', producto)
  }

  return (
    <Container>
      <h1 className="parodia">Panel de Administración</h1>
      <h2 className="h4 text-white mb-3">Productos</h2>
      <AdminProductosTable productos={productos} onEdit={editar} onDelete={eliminar} />
    </Container>
  )
}