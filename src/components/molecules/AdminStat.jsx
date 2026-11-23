import Text from '../atoms/Text'

function AdminStat({ etiqueta, valor }) {
  return (
    <div className="admin-stat">
      <Text variant="span" className="admin-stat__valor">{valor}</Text>
      <Text variant="span" className="admin-stat__etiqueta">{etiqueta}</Text>
    </div>
  )
}

export default AdminStat
