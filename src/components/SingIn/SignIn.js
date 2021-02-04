import { useState } from 'react'
import { useForm } from '../../hooks'
import { Field, Form } from '../../elements'
import { validations } from '../../utils/functions'

const iv = { username: '', password: '' }

export default function SignIn() {
  const [input, handleChange] = useForm(iv)
  const [errors, setErrors] = useState({})

  return (
    <Form>
      <Field name="username" value={input.username} onChange={handleChange} />
      <Field.Password
        name="password"
        value={input.password}
        onChange={handleChange}
      />
    </Form>
  )
}
