import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Button from '../components/atoms/Button'
import AdminProductoForm from '../components/organisms/AdminProductoForm'
import AdminProductosTable from '../components/organisms/AdminProductosTable'
import { productos as productosIniciales } from '../data/productos'

export default function Admin() {
  const [productos, setProductos] = useState(productosIniciales)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editando, setEditando] = useState(null)

  const abrirNuevo = () => {
    setEditando(null)
    setMostrarForm(true)
  }

  const abrirEditar = (producto) => {
    setEditando(producto)
    setMostrarForm(true)
  }

  const cerrarForm = () => {
    setEditando(null)
    setMostrarForm(false)
  }

  const guardar = (datos) => {
    if (editando) {
      setProductos((lista) =>
        lista.map((p) => (p.id === editando.id ? { ...p, ...datos } : p))
      )
    } else {
      const nuevoId = productos.reduce((max, p) => Math.max(max, p.id), 0) + 1
      setProductos((lista) => [...lista, { id: nuevoId, ...datos }])
    }
    cerrarForm()
  }

  const eliminar = (id) => {
    setProductos((lista) => lista.filter((p) => p.id !== id))
  }

  return (
    <Container>
      <h1 className="parodia">Panel de Administración</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 text-white mb-0">Productos</h2>
        <Button variant="info" onClick={abrirNuevo}>Nuevo producto</Button>
      </div>

      {mostrarForm && (
        <AdminProductoForm
          key={editando ? editando.id : 'nuevo'}
          producto={editando}
          onSave={guardar}
          onCancel={cerrarForm}
        />
      )}

      <AdminProductosTable productos={productos} onEdit={abrirEditar} onDelete={eliminar} />
    </Container>
  )
}