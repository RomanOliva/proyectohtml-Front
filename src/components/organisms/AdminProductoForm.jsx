import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import FormField from '../molecules/FormField'

function AdminProductoForm({ producto, categorias, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nombre: producto?.nombre ?? '',
      descripcion: producto?.descripcion ?? '',
      precio: producto?.precio ?? '',
      stock: producto?.stock ?? '',
      categoriaId: producto?.categoria?.id ?? '',
      imagen: producto?.imagen ?? '',
    },
  })

  return (
    <Form noValidate onSubmit={handleSubmit(onSave)} className="panel-dark auth-box admin-form mb-4">
      <Text variant="h2" className="auth-titulo">
        {producto ? 'Editar producto' : 'Nuevo producto'}
      </Text>

      <FormField
        id="producto-nombre"
        label="Nombre"
        placeholder="Nombre del producto"
        error={errors.nombre?.message}
        {...register('nombre', {
          validate: (v) =>
            (v.trim() !== '' && v.trim().length <= 60) || 'Ingresa un nombre de hasta 60 caracteres.',
        })}
      />

      <FormField
        id="producto-descripcion"
        label="Descripción"
        type="textarea"
        rows={3}
        placeholder="Descripción del producto"
        error={errors.descripcion?.message}
        {...register('descripcion', {
          validate: (v) =>
            (v.trim() !== '' && v.trim().length <= 150) ||
            'Ingresa una descripción de hasta 150 caracteres.',
        })}
      />

      <FormField
        id="producto-precio"
        label="Precio (Platinum)"
        type="number"
        placeholder="Ej: 100"
        error={errors.precio?.message}
        {...register('precio', {
          valueAsNumber: true,
          validate: (v) =>
            (Number.isInteger(v) && v >= 1 && v <= 3000) || 'Ingresa un precio entero entre 1 y 3000.',
        })}
      />

      <FormField
        id="producto-stock"
        label="Stock"
        type="number"
        placeholder="Ej: 10"
        error={errors.stock?.message}
        {...register('stock', {
          valueAsNumber: true,
          validate: (v) =>
            (Number.isInteger(v) && v >= 0 && v <= 100000) || 'Ingresa un stock entero entre 0 y 100000.',
        })}
      />

      <Form.Group className="mb-3" controlId="producto-categoria">
        <Form.Label>Categoría</Form.Label>
        <Form.Select
          isInvalid={!!errors.categoriaId}
          {...register('categoriaId', {
            valueAsNumber: true,
            validate: (v) => !Number.isNaN(v) || 'Selecciona una categoría.',
          })}
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </Form.Select>
        {errors.categoriaId && (
          <Form.Control.Feedback type="invalid">{errors.categoriaId.message}</Form.Control.Feedback>
        )}
      </Form.Group>

      <FormField
        id="producto-imagen"
        label="URL de la imagen"
        placeholder="https://i.ibb.co/..."
        error={errors.imagen?.message}
        {...register('imagen', {
          validate: (v) =>
            (v.trim() !== '' && v.trim().length <= 255) || 'Ingresa la URL de la imagen (máx. 255).',
        })}
      />

      <div className="d-flex gap-2">
        <Button type="submit" variant="info" className="flex-fill">Guardar</Button>
        <Button type="button" variant="outline-light" className="flex-fill" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </Form>
  )
}

export default AdminProductoForm