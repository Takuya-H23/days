import { ApolloServer } from 'apollo-server-micro'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'
import Cookies from 'cookies'
import Either from 'crocks/Either'
import { identity, isNil, prop, tryCatch } from 'ramda'
import typeDefs from './schemas'
import resolvers from './resolvers'
import { AUTH_COOKIE } from '../../src/utils/locale/constants'

const returnNull = () => null

const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DB_CONNECTION_STRING
})

// eslint-disable-next-line no-undef
const authenticateUser = token => jwt.verify(token, process.env.JWT_SECRET)

const test = tryCatch(authenticateUser, returnNull)

const tokenEither = x => (isNil(x) ? Either.Left(x) : Either.Right(x))

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    const cookies = new Cookies(req, res)
    const token = test(cookies.get(AUTH_COOKIE))
    const userIdEither = tokenEither(token).map(prop('id'))

    return {
      cookies,
      userIdEither,
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
