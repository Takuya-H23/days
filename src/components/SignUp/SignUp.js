import { useState } from 'react'
import { useRouter } from 'next/router'
import { isEmpty } from 'ramda'
import { Box } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import SignUpForm from './SignUpForm'
import { useForm, useSignUp } from '../../hooks'
import { validations } from '../../utils/functions'
import { ROUTES } from '../../utils/locale/constants'

const iv = { username: '', email: '', password: '' }

export default function SignUp() {
  const router = useRouter()
  const [input, handleChange] = useForm(iv)
  const [errors, setErrors] = useState({})
  const mutation = useSignUp({ input })

  const onSubmit = e => {
    e.preventDefault()
    const res = Object.entries(input).reduce(
      (acc, [key, value]) =>
        validations[key].run(value)
          ? acc
          : { ...acc, [key]: `Please enter a valid ${key}` },
      {}
    )
    isEmpty(res) ? mutation.mutate() : setErrors(res)
  }

  if (mutation.isSuccess) {
    router.push(ROUTES.DASHBOARD.URL)
  }

  return (
    <Box>
      {mutation.isError &&
        mutation.error.response.errors.map(({ message }, idx) => (
          <Box my={2} key={message.concat(idx)}>
            <Alert severity="error">{message}</Alert>
          </Box>
        ))}
      <SignUpForm
        input={input}
        errors={errors}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
    </Box>
  )
}
