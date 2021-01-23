import { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { Layout } from '../src/components'
import { useSignUp } from '../src/hooks'

const iv = { username: '', full_name: '', email: '', password: '' }

export default function SignUp() {
  const [input, setInput] = useState(iv)
  const mutation = useSignUp({ input })

  const onSubmit = e => {
    e.preventDefault()
    mutation.mutate()
  }

  const handleChange = e => {
    const { name, value } = e.target
    setInput(cur => ({
      ...cur,
      [name]: value
    }))
  }

  return (
    <Layout>
      <from onSubmit={onSubmit}>
        <TextField
          name="username"
          onChange={handleChange}
          value={input.username}
          label="username"
          type="text"
          variant="outlined"
        />
        <TextField
          name="full_name"
          onChange={handleChange}
          value={input.full_name}
          label="full_name"
          type="text"
          variant="outlined"
        />
        <TextField
          name="email"
          onChange={handleChange}
          value={input.email}
          label="email"
          type="email"
          variant="outlined"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={input.password}
          label="password"
          type="password"
          variant="outlined"
        />
        <Button type="submit" onClick={onSubmit}>
          Sign up
        </Button>
      </from>
    </Layout>
  )
}
