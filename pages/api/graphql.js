import { Pool } from "pg"
import { gql, ApolloServer } from "apollo-server-micro"

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

let client

async function init() {
  client = await pool.connect()
}

init()

const typeDefs = gql`
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

const resolvers = {
  Query: {
    users: async () => {
      const users = await client.query("SELECT * FROM users")
      return users.rows
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.headers.host)
    return {}
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = apolloServer.createHandler({ path: "/api/graphql" })

export default handler
