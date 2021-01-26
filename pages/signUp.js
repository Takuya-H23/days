import Link from 'next/link'
import {
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core'
import { AccountBox, Email, VisibilityOff } from '@material-ui/icons'
import { Layout } from '../src/components'
import { Field } from '../src/elements'
import { useForm, useSignUp } from '../src/hooks'

const iv = { username: '', email: '', password: '' }

export default function SignUp() {
  const [input, handleChange] = useForm(iv)
  const mutation = useSignUp({ input })
  // TODO: provide error message such as "this username is unavailable"
  const onSubmit = e => {
    e.preventDefault()
    mutation.mutate()
  }

  if (mutation.isLoading) return <CircularProgress />
  if (mutation.isError) {
    return <Typography variant="h1">Something went wrong</Typography>
  }

  return (
    <Layout>
      <Typography variant="h1">Days</Typography>
      <Typography variant="body1">
        Start your developer tool from here!
      </Typography>
      <form onSubmit={onSubmit}>
        <Field name="username" onChange={handleChange} value={input.username} />
        <Field name="email" onChange={handleChange} value={input.email} />
        <TextField
          name="password"
          onChange={handleChange}
          value={input.password}
          InputProps={{
            endAdornment: <VisibilityOff />
          }}
          label="password"
          type="password"
          variant="outlined"
          fullWidth
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
