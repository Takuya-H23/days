import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Box, Button, LinearProgress, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { isEmpty } from 'ramda'
import { Layout } from '../src/components'
import { Field } from '../src/elements'
import { useForm, useSignUp } from '../src/hooks'
import { validations } from '../src/utils/functions'
import { ROUTES } from '../src/utils/locale/constants'

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
    <Layout>
      {mutation.isLoading && <LinearProgress />}
      <Typography variant="h1">Days</Typography>
      <Typography variant="body1">
        Start your developer tool from here!
      </Typography>
      {mutation.isError &&
        mutation.error.response.errors.map(({ message }, idx) => (
          <Box my={2} key={message.concat(idx)}>
            <Alert severity="error">{message}</Alert>
          </Box>
        ))}
      <form onSubmit={onSubmit}>
        <Field
          name="username"
          onChange={handleChange}
          value={input.username}
          error={Boolean(errors.username)}
          helperText={errors.username || ' '}
        />
        <Field
          name="email"
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email || ' '}
          value={input.email}
          type="email"
        />
        <Field.Password
          name="password"
          onChange={handleChange}
          value={input.password}
          error={Boolean(errors.password)}
          helperText="Password must contain 8 to 16 characters"
        />
        <Button variant="contained" type="submit" onClick={onSubmit}>
          Sign up
        </Button>
      </form>
      <Typography variant="body1">
        Already have an account? Login from{' '}
        <Link href={ROUTES.SIGN_IN.URL}>
          <a>here</a>
        </Link>
      </Typography>
    </Layout>
  )
}
