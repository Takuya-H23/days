import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    user: User!
    users: [User!]!
  }

  type Mutation {
    signUp(input: SignUpInput): User!
    signIn(input: SignInInput): User!
  }

  type User {
    user_id: ID!
    username: String!
    email: String!
    created_at: String!
    last_login: String
  }

  input SignUpInput {
    username: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
`
