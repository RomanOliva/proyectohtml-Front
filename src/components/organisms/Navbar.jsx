import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { ruta } from '../../utils/ruta'
import Button from '../atoms/Button'
import Image from '../atoms/Image'

function NavBar({ cantidadCarrito = 0 }) {
  const { usuario, estaAutenticado, tieneRol, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const esVendedor = tieneRol('VENDEDOR')
  const puedeVerPanel = tieneRol('ADMIN', 'VENDEDOR')

  const salir = () => {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <Navbar expand="md" variant="dark" className="site-header">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <Image src={ruta('imagenes/logo.webp')} alt="Warframe Logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="mx-auto">
            {!esVendedor && (
              <>
                <Nav.Link as={NavLink} to="/contacto">Contáctenos</Nav.Link>
                <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
                <Nav.Link as={NavLink} to="/carrito">Carrito ({cantidadCarrito})</Nav.Link>
              </>
            )}
            {puedeVerPanel && <Nav.Link as={NavLink} to="/admin">Panel</Nav.Link>}
          </Nav>
          <Nav className="align-items-md-center">
            {estaAutenticado ? (
              <>
                <span className="navbar-text me-3">
                  {usuario.correo} ({usuario.rol})
                </span>
                <Button size="sm" variant="outline-info" onClick={salir}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="link-sesion">Iniciar Sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar