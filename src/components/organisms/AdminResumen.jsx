import AdminStat from '../molecules/AdminStat'

function AdminResumen({ resumen }) {
  return (
    <div className="admin-stats">
      <AdminStat etiqueta="Productos" valor={resumen.total} />
      <AdminStat etiqueta="Categorías" valor={resumen.categorias} />
      <AdminStat etiqueta="Unidades en stock" valor={resumen.unidades} />
      <AdminStat etiqueta="Stock bajo" valor={resumen.stockBajo} />
    </div>
  )
}

export default AdminResumen
