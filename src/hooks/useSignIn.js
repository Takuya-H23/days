import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { ENDPOINT } from '../utils/locale/constants'

const signIn = gql`
  mutation($input: SignInInput) {
    signIn(input: $input) {
      username
      email
      created_at
    }
  }
`

export default function useSignIn(variables) {
  return useMutation(
    'signIn',
    async () => await request(ENDPOINT, signIn, variables)
  )
}
