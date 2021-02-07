import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import typeDefs from './schemas'
import resolvers from './resolvers'
import { AUTH_COOKIE } from '../../src/utils/locale/constants'

const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DB_CONNECTION_STRING
})

// eslint-disable-next-line no-undef
const authenticateUser = token => jwt.verify(token, process.env.JWT_SECRET)

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const cookies = new Cookies(req, res)
    const token = cookies.get(AUTH_COOKIE)

    return {
      cookies,
      pool,
      isAuthenticated: authenticateUser(token)
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
