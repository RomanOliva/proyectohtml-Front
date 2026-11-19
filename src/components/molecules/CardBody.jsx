import Text from '../atoms/Text'

function CardBody({ title, price, category, description }) {
  return (
    <>
      {category && <span className="item__categoria">{category}</span>}
      <Text variant="h3" className="h5">{title}</Text>
      {description && <Text variant="p" className="item__descripcion">{description}</Text>}
      <Text variant="p">Precio: {price} Platinum</Text>
    </>
  )
}

export default CardBody
