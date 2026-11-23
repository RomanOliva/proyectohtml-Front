import { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import Button from '../components/atoms/Button'
import CategoryFilter from '../components/molecules/CategoryFilter'
import EstadoCarga from '../components/molecules/EstadoCarga'
import EstadoError from '../components/molecules/EstadoError'
import SearchBar from '../components/molecules/SearchBar'
import AdminProductoModal from '../components/organisms/AdminProductoModal'
import AdminProductosTable from '../components/organisms/AdminProductosTable'
import AdminResumen from '../components/organisms/AdminResumen'
import ConfirmarEliminar from '../components/organisms/ConfirmarEliminar'
import useCategorias from '../hooks/useCategorias'
import useProductos from '../hooks/useProductos'
import { usarMock } from '../services/api'
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
} from '../services/productoService'
import { extraerCategorias, filtrarAdmin, resumenInventario } from '../utils/productos'

function mensajeError(err) {
  if (err.estado === 401) return 'Tu sesión no es válida. Inicia sesión como administrador.'
  if (err.estado === 403) return 'No tienes permisos para realizar esta acción.'
  return err.message
}

export default function Admin() {
  const { productos, cargando, error, reintentar, modificar } = useProductos()
  const categorias = useCategorias()

  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [formulario, setFormulario] = useState(null)
  const [errorForm, setErrorForm] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [aEliminar, setAEliminar] = useState(null)
  const [eliminando, setEliminando] = useState(false)
  const [aviso, setAviso] = useState(null)

  const abrirForm = (producto = null) => {
    setErrorForm(null)
    setFormulario({ producto })
  }

  const cerrarForm = () => {
    setFormulario(null)
    setErrorForm(null)
  }

  const guardar = async (datos) => {
    setGuardando(true)
    setErrorForm(null)
    try {
      const editado = formulario.producto
      if (editado) {
        const actualizado = await actualizarProducto(editado.id, datos)
        modificar((lista) => lista.map((p) => (p.id === editado.id ? actualizado : p)))
        setAviso({ variant: 'success', texto: `«${actualizado.nombre}» se actualizó correctamente.` })
      } else {
        const nuevo = await crearProducto(datos)
        modificar((lista) => [...lista, nuevo])
        setAviso({ variant: 'success', texto: `«${nuevo.nombre}» se creó correctamente.` })
      }
      cerrarForm()
    } catch (err) {
      setErrorForm(mensajeError(err))
    } finally {
      setGuardando(false)
    }
  }

  const confirmarEliminar = async () => {
    setEliminando(true)
    try {
      await eliminarProducto(aEliminar.id)
      modificar((lista) => lista.filter((p) => p.id !== aEliminar.id))
      setAviso({ variant: 'success', texto: `«${aEliminar.nombre}» se eliminó.` })
    } catch (err) {
      setAviso({ variant: 'danger', texto: mensajeError(err) })
    } finally {
      setEliminando(false)
      setAEliminar(null)
    }
  }

  const visibles = filtrarAdmin(productos, busqueda, categoria)

  return (
    <Container>
      <h1 className="parodia">Panel de Administración</h1>

      {usarMock() && (
        <Alert variant="warning" className="text-center">
          Modo demostración: los cambios se guardan solo en este navegador.
        </Alert>
      )}

      {aviso && (
        <Alert variant={aviso.variant} dismissible onClose={() => setAviso(null)}>
          {aviso.texto}
        </Alert>
      )}

      {cargando && <EstadoCarga mensaje="Cargando inventario..." />}
      {error && <EstadoError mensaje={error} onRetry={reintentar} />}

      {!cargando && !error && (
        <>
          <AdminResumen resumen={resumenInventario(productos)} />

          <div className="admin-cabecera">
            <h2 className="admin-titulo">Inventario</h2>
            <Button variant="info" onClick={() => abrirForm()}>Nuevo producto</Button>
          </div>

          <SearchBar value={busqueda} onChange={setBusqueda} />
          {extraerCategorias(productos).length > 0 && (
            <CategoryFilter
              categorias={extraerCategorias(productos)}
              value={categoria}
              onChange={setCategoria}
            />
          )}

          <AdminProductosTable
            productos={visibles}
            onEdit={abrirForm}
            onDelete={setAEliminar}
          />
        </>
      )}

      {formulario && (
        <AdminProductoModal
          key={formulario.producto ? formulario.producto.id : 'nuevo'}
          producto={formulario.producto}
          categorias={categorias}
          guardando={guardando}
          error={errorForm}
          onSave={guardar}
          onCancel={cerrarForm}
        />
      )}

      {aEliminar && (
        <ConfirmarEliminar
          producto={aEliminar}
          eliminando={eliminando}
          onConfirm={confirmarEliminar}
          onCancel={() => setAEliminar(null)}
        />
      )}
    </Container>
  )
}
