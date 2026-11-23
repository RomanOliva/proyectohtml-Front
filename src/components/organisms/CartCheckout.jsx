import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import Text from '../atoms/Text'

function CartCheckout({ autenticado, enviando, error, onCheckout }) {
  if (!autenticado) {
    return (
      <div className="panel-dark text-center cart-checkout">
        <Text>Para finalizar tu compra necesitas iniciar sesión o crear una cuenta.</Text>
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          <Link to="/login" state={{ desde: '/carrito' }} className="btn btn-info">
            Iniciar sesión para comprar
          </Link>
          <Link to="/registro" className="btn btn-outline-info">Crear cuenta</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="panel-dark text-center cart-checkout">
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="info" size="lg" disabled={enviando} onClick={onCheckout}>
        {enviando ? 'Procesando compra...' : 'Finalizar compra'}
      </Button>
    </div>
  )
}

export default CartCheckout
