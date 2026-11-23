import Text from '../atoms/Text'

function CardBody({ title, price, category, description, stock }) {
  return (
    <>
      {category && <span className="item__categoria">{category}</span>}
      <Text variant="h3" className="h5 item__nombre">{title}</Text>
      {description && <Text variant="p" className="item__descripcion">{description}</Text>}
      <Text variant="p" className="mb-1">Precio: {price} Platinum</Text>
      {typeof stock === 'number' && (
        <Text variant="p" className={stock > 0 ? 'item__stock' : 'item__stock item__stock--agotado'}>
          {stock > 0 ? `Disponibles: ${stock}` : 'Agotado'}
        </Text>
      )}
    </>
  )
}

export default CardBody
