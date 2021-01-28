import { ApolloServer } from 'apollo-server-micro'
import Cookies from 'cookies'
import typeDefs from './schemas'
import resolvers from './resolvers'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      cookies: new Cookies(req, res)
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
