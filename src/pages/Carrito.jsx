import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Text from '../components/atoms/Text'
import CartCheckout from '../components/organisms/CartCheckout'
import CartTable from '../components/organisms/CartTable'
import useAuth from '../hooks/useAuth'
import { crearBoleta } from '../services/boletaService'

export default function Carrito({ carrito, onRemove, onClear }) {
  const { usuario } = useAuth()
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [boleta, setBoleta] = useState(null)

  const comprar = async () => {
    setError(null)
    setEnviando(true)
    try {
      const creada = await crearBoleta(carrito)
      setBoleta(creada)
      onClear()
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  if (boleta) {
    return (
      <Container>
        <h1 className="parodia">Compra realizada</h1>
        <div className="panel-dark text-center cart-checkout" role="status">
          <Text variant="h2" className="cart-total__texto">¡Gracias por tu compra!</Text>
          <Text>
            Boleta N° {boleta.id} · Total: {boleta.total} Platinum
          </Text>
          <Link to="/productos" className="btn btn-info">Seguir comprando</Link>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <h1 className="parodia">Tu carrito</h1>
      <CartTable carrito={carrito} onRemove={onRemove} />
      {carrito.length > 0 && (
        <CartCheckout
          autenticado={!!usuario}
          enviando={enviando}
          error={error}
          onCheckout={comprar}
        />
      )}
    </Container>
  )
}
