import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/organisms/Footer'
import NavBar from './components/organisms/Navbar'
import Carrito from './pages/Carrito'
import Contacto from './pages/Contacto'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Productos from './pages/Productos'
import Registro from './pages/Registro'
import Admin from './pages/Admin'
import { agregarAlCarrito, contarItems, quitarDelCarrito } from './utils/carrito'
import AccesoDenegado from './pages/AccesoDenegado'
import RutaProtegida from './routes/RutaProtegida'

export default function App() {
  const [carrito, setCarrito] = useState([])

  const agregar = (producto) => setCarrito((c) => agregarAlCarrito(c, producto))
  const quitar = (id) => setCarrito((c) => quitarDelCarrito(c, id))

  return (
    <>
      <NavBar cantidadCarrito={contarItems(carrito)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos onAdd={agregar} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} onRemove={quitar} />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route element={<RutaProtegida roles={['ADMIN', 'VENDEDOR']} />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/acceso-denegado" element={<AccesoDenegado />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
