import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import FormField from '../molecules/FormField'

function AdminProductoForm({ producto, onSave, onCancel }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nombre: producto?.nombre ?? '',
      descripcion: producto?.descripcion ?? '',
      precio: producto?.precio ?? '',
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
          validate: (v) => v.trim() !== '' || 'Debes ingresar un nombre.',
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
          validate: (v) => v.trim() !== '' || 'Debes ingresar una descripción.',
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
          validate: (v) => (!Number.isNaN(v) && v > 0) || 'Ingresa un precio mayor a 0.',
        })}
      />

      <FormField
        id="producto-imagen"
        label="URL de la imagen"
        placeholder="https://i.ibb.co/..."
        error={errors.imagen?.message}
        {...register('imagen', {
          validate: (v) => v.trim() !== '' || 'Debes ingresar la URL de la imagen.',
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