import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import Cookies from 'cookies'
import typeDefs from './schemas'
import resolvers from './resolvers'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      cookies: new Cookies(req, res),
      pool
    }
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

const handler = apolloServer.createHandler({ path: '/api/graphql' })

export default handler
