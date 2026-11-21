import { Container } from 'react-bootstrap'

export default function Admin() {
  return (
    <Container>
      <h1 className="parodia">Panel de Administración</h1>
      <div className="panel-dark p-4">
        <p className="text-white mb-0">Aqui ira la gestion de productos y ordenes.</p>
      </div>
    </Container>
  )
}