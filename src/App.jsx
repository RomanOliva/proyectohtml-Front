import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RutaProtegida from './components/RutaProtegida'
import Footer from './components/organisms/Footer'
import NavBar from './components/organisms/Navbar'
import Carrito from './pages/Carrito'
import Contacto from './pages/Contacto'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Admin from './pages/Admin'
import Productos from './pages/Productos'
import Registro from './pages/Registro'
import { agregarAlCarrito, contarItems, quitarDelCarrito } from './utils/carrito'

export default function App() {
  const [carrito, setCarrito] = useState([])

  const agregar = (producto) => setCarrito((c) => agregarAlCarrito(c, producto))
  const quitar = (id) => setCarrito((c) => quitarDelCarrito(c, id))
  const vaciar = () => setCarrito([])

  return (
    <>
      <NavBar cantidadCarrito={contarItems(carrito)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos onAdd={agregar} carrito={carrito} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} onRemove={quitar} onClear={vaciar} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route
            path="/admin"
            element={
              <RutaProtegida roles={['ADMIN']}>
                <Admin />
              </RutaProtegida>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
