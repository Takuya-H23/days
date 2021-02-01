import { useState } from 'react'
import Link from 'next/link'
import { Button, LinearProgress, Typography } from '@material-ui/core'
import { isEmpty } from 'ramda'
import { Layout } from '../src/components'
import { Field } from '../src/elements'
import { useForm, useSignUp } from '../src/hooks'
import { validations } from '../src/utils/functions'

const iv = { username: '', email: '', password: '' }

export default function SignUp() {
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

  console.log(mutation)

  return (
    <Layout>
      {mutation.isLoading && <LinearProgress />}
      <Typography variant="h1">Days</Typography>
      <Typography variant="body1">
        Start your developer tool from here!
      </Typography>
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
        <Link href="/">
          <a>here</a>
        </Link>
      </Typography>
    </Layout>
  )
}
