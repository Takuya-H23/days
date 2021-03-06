import { useState } from 'react'
import { Button } from '@material-ui/core'
import { isEmpty } from 'ramda'
import { useForm, useSignIn } from '../../hooks'
import { Field, Form } from '../../elements'
import { validate } from '../../utils/functions'

const getErrors = errors => key => errors[key] || ' '

const iv = { email: '', password: '' }

export default function SignIn() {
  const [input, handleChange] = useForm(iv)
  const [errors, setErrors] = useState({})
  const getErrorText = getErrors(errors)
  const mutation = useSignIn({ input })

  const onSubmit = e => {
    e.preventDefault()
    const res = validate(input)
    isEmpty(res) ? mutation.mutate() : setErrors(res)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Field
        name="email"
        value={input.email}
        onChange={handleChange}
        error={Boolean(errors.email)}
        helperText={getErrorText('email')}
      />
      <Field.Password
        name="password"
        value={input.password}
        error={Boolean(errors.password)}
        onChange={handleChange}
        helperText={getErrorText('password')}
      />
      <Button variant="contained" type="submit" onClick={onSubmit}>
        Sign up
      </Button>
    </Form>
  )
}
