import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    user: User!
    users: [User!]!
  }

  type Mutation {
    signUp(input: SignUpInput): AuthPayload!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    created_at: String!
    last_login: String
  }

  type AuthPayload {
    user: User!
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }
`
