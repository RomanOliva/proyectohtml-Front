import { useEffect, useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import Button from '../components/atoms/Button'
import Text from '../components/atoms/Text'
import AdminOrdenDetalle from '../components/organisms/AdminOrdenDetalle'
import AdminOrdenesTable from '../components/organisms/AdminOrdenesTable'
import AdminProductoForm from '../components/organisms/AdminProductoForm'
import AdminProductosTable from '../components/organisms/AdminProductosTable'
import { listarCategorias } from '../services/categoriasService'
import { listarOrdenes } from '../services/ordenesService'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
} from '../services/productosService'

export default function Admin() {
  const [seccion, setSeccion] = useState('productos')
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [ordenes, setOrdenes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [editando, setEditando] = useState(null)
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null)

  useEffect(() => {
    async function cargar() {
      try {
        const [listaProductos, listaCategorias] = await Promise.all([
          listarProductos(),
          listarCategorias(),
        ])
        setProductos(listaProductos)
        setCategorias(listaCategorias)
      } catch (e) {
        setError(`No se pudieron cargar los productos: ${e.message}`)
      }

      try {
        setOrdenes(await listarOrdenes())
      } catch (e) {
        setError((actual) => actual || `No se pudieron cargar las órdenes: ${e.message}`)
      }

      setCargando(false)
    }
    cargar()
  }, [])

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

  const guardar = async (datos) => {
    try {
      if (editando) {
        const actualizado = await actualizarProducto(editando.id, datos)
        setProductos((lista) => lista.map((p) => (p.id === editando.id ? actualizado : p)))
      } else {
        const creado = await crearProducto(datos)
        setProductos((lista) => [...lista, creado])
      }
      cerrarForm()
    } catch (e) {
      setError(`No se pudo guardar el producto: ${e.message}`)
    }
  }

  const eliminar = async (id) => {
    try {
      await eliminarProducto(id)
      setProductos((lista) => lista.filter((p) => p.id !== id))
    } catch (e) {
      setError(`No se pudo eliminar el producto: ${e.message}`)
    }
  }

  return (
    <Container>
      <h1 className="parodia">Panel de Administración</h1>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="d-flex gap-2 mb-4">
        <Button
          variant={seccion === 'productos' ? 'info' : 'outline-info'}
          onClick={() => setSeccion('productos')}
        >
          Productos
        </Button>
        <Button
          variant={seccion === 'ordenes' ? 'info' : 'outline-info'}
          onClick={() => setSeccion('ordenes')}
        >
          Órdenes
        </Button>
      </div>

      {cargando && <Text className="text-white">Cargando...</Text>}

      {!cargando && seccion === 'productos' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h4 text-white mb-0">Productos</h2>
            <Button variant="info" onClick={abrirNuevo}>Nuevo producto</Button>
          </div>

          {mostrarForm && (
            <AdminProductoForm
              key={editando ? editando.id : 'nuevo'}
              producto={editando}
              categorias={categorias}
              onSave={guardar}
              onCancel={cerrarForm}
            />
          )}

          <AdminProductosTable productos={productos} onEdit={abrirEditar} onDelete={eliminar} />
        </>
      )}

      {!cargando && seccion === 'ordenes' && (
        <>
          <h2 className="h4 text-white mb-3">Órdenes</h2>
          <AdminOrdenesTable ordenes={ordenes} onView={setOrdenSeleccionada} />
        </>
      )}

      <AdminOrdenDetalle orden={ordenSeleccionada} onClose={() => setOrdenSeleccionada(null)} />
    </Container>
  )
}