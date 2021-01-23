import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { Button, TextField } from '@material-ui/core'
import { Layout } from '../src/components'

const iv = { username: '', full_name: '', email: '', password: '' }

const endpoint = '/api/graphql'

const signUp = gql`
  mutation($input: SignUpInput) {
    signUp(input: $input) {
      user {
        username
        full_name
        email
        created_at
      }
    }
  }
`

function useUser(variables) {
  return useMutation('user', async () => {
    const data = await request(endpoint, signUp, variables)
    return data
  })
}

export default function SignUp() {
  const [{ username, full_name, email, password }, setState] = useState(iv)
  const mutation = useUser({ input: { username, full_name, email, password } })

  const onSubmit = e => {
    e.preventDefault()
    mutation.mutate()
  }

  const handleChange = e => {
    const { name, value } = e.target
    setState(cur => ({
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
          value={username}
          label="username"
          type="text"
          variant="outlined"
        />
        <TextField
          name="full_name"
          onChange={handleChange}
          value={full_name}
          label="full_name"
          type="text"
          variant="outlined"
        />
        <TextField
          name="email"
          onChange={handleChange}
          value={email}
          label="email"
          type="email"
          variant="outlined"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={password}
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
