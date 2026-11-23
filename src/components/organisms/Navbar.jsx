import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Image from '../atoms/Image'
import useAuth from '../../hooks/useAuth'
import { ruta } from '../../utils/ruta'

function NavBar({ cantidadCarrito = 0 }) {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const salir = () => {
    logout()
    navigate('/')
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
            <Nav.Link as={NavLink} to="/contacto">Contáctenos</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito ({cantidadCarrito})</Nav.Link>
            {usuario?.rol === 'ADMIN' && (
              <Nav.Link as={NavLink} to="/admin">Admin</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-md-center">
            {usuario ? (
              <>
                <span className="navbar-usuario" title={usuario.correo}>{usuario.correo}</span>
                <Nav.Link as="button" type="button" className="link-sesion" onClick={salir}>
                  Cerrar Sesión
                </Nav.Link>
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
