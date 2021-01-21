import { gql } from "apollo-server-micro"

export default gql`
  type Query {
    users: [User!]!
  }

  type User {
    user_id: ID!
    username: String!
    full_name: String!
    created_at: String!
    last_login: String
  }
`
