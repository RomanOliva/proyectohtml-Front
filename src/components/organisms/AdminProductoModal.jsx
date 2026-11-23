import { Alert, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Button from '../atoms/Button'
import FormField from '../molecules/FormField'

const URL_VALIDA = /^(https?:\/\/|\/)/

function AdminProductoModal({ producto, categorias, guardando, error, onSave, onCancel }) {
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

  const enviar = (datos) => onSave({ ...datos, categoriaId: Number(datos.categoriaId) })

  return (
    <Modal
      show
      centered
      size="lg"
      onHide={guardando ? undefined : onCancel}
      backdrop={guardando ? 'static' : true}
      contentClassName="modal-warframe"
    >
      <Form noValidate onSubmit={handleSubmit(enviar)}>
        <Modal.Header closeButton closeVariant="white" closeLabel="Cerrar">
          <Modal.Title>{producto ? 'Editar producto' : 'Nuevo producto'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

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

          <div className="row">
            <div className="col-md-6">
              <FormField
                id="producto-categoria"
                label="Categoría"
                type="select"
                error={errors.categoriaId?.message}
                {...register('categoriaId', {
                  validate: (v) => v !== '' || 'Selecciona una categoría.',
                })}
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </FormField>
            </div>
            <div className="col-md-3">
              <FormField
                id="producto-precio"
                label="Precio (Platinum)"
                type="number"
                placeholder="Ej: 100"
                error={errors.precio?.message}
                {...register('precio', {
                  valueAsNumber: true,
                  validate: (v) => (!Number.isNaN(v) && v > 0) || 'Precio mayor a 0.',
                })}
              />
            </div>
            <div className="col-md-3">
              <FormField
                id="producto-stock"
                label="Stock"
                type="number"
                placeholder="Ej: 20"
                error={errors.stock?.message}
                {...register('stock', {
                  valueAsNumber: true,
                  validate: (v) => (Number.isInteger(v) && v >= 0) || 'Entero desde 0.',
                })}
              />
            </div>
          </div>

          <FormField
            id="producto-imagen"
            label="URL de la imagen (opcional)"
            placeholder="https://..."
            error={errors.imagen?.message}
            {...register('imagen', {
              validate: (v) => v.trim() === '' || URL_VALIDA.test(v.trim()) || 'Debe empezar con http:// o https://',
            })}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" variant="outline-light" disabled={guardando} onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="info" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AdminProductoModal
