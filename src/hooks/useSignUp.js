import { useMutation } from 'react-query'
import { request, gql } from 'graphql-request'
import { ENDPOINT } from '../utils/locale/constants'

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

export default function useSignUp(variables) {
  return useMutation(
    'signUp',
    async () => await request(ENDPOINT, signUp, variables)
  )
}
