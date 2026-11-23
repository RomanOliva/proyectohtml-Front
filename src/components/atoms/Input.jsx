import { Form } from 'react-bootstrap'

function Input({ className = '', type = 'text', ...props }) {
  const componentProps = {
    className,
    ...(type === 'textarea' ? { as: 'textarea' } : type === 'select' ? { as: 'select' } : { type }),
    ...props,
  }
  return <Form.Control {...componentProps} />
}

export default Input
