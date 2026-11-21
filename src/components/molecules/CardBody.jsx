import Text from '../atoms/Text'

function CardBody({ title, price, description }) {
  return (
    <>
      <Text variant="h3" className="h5">{title}</Text>
      {description && <Text variant="p">{description}</Text>}
      <Text variant="p">Precio: {price} Platinum</Text>
    </>
  )
}

export default CardBody