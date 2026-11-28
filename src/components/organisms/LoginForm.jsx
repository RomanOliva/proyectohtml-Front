import { Alert, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Button from '../atoms/Button'
import Link from '../atoms/Link'
import Text from '../atoms/Text'
import FormField from '../molecules/FormField'

function LoginForm({ onLogin, error }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  return (
    <Form noValidate onSubmit={handleSubmit(onLogin)} className="panel-dark auth-box">
      <Text variant="h2" className="auth-titulo">Iniciar Sesión</Text>

      <FormField
        id="correo-login"
        label="Correo electrónico"
        type="email"
        placeholder="Ingrese su correo"
        autoComplete="email"
        error={errors.correo?.message}
        {...register('correo', {
          validate: (v) => v.trim() !== '' || 'Debes ingresar tu correo.',
        })}
      />

      <FormField
        id="password-login"
        label="Contraseña"
        type="password"
        placeholder="Ingrese contraseña"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', {
          validate: (v) => v.trim() !== '' || 'Debes ingresar tu contraseña.',
        })}
      />

      {error && <Alert variant="danger">{error}</Alert>}

      <Button type="submit" variant="info" className="w-100" disabled={isSubmitting}>
        Ingresar
      </Button>

      <Text className="auth-switch mt-3 mb-0">
        ¿No tiene cuenta? <Link to="/registro">Regístrate aquí</Link>
      </Text>
    </Form>
  )
}

export default LoginForm