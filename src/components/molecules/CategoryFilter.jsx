import Button from '../atoms/Button'

function CategoryFilter({ categorias, value, onChange }) {
  return (
    <div className="categorias" role="group" aria-label="Filtrar por categoría">
      <Button
        size="sm"
        variant={value === '' ? 'info' : 'outline-info'}
        onClick={() => onChange('')}
      >
        Todas
      </Button>
      {categorias.map((c) => (
        <Button
          key={c}
          size="sm"
          variant={value === c ? 'info' : 'outline-info'}
          onClick={() => onChange(c)}
        >
          {c}
        </Button>
      ))}
    </div>
  )
}

export default CategoryFilter
