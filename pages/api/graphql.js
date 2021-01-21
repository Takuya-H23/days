import { ApolloServer } from "apollo-server-micro"
import typeDefs from "./schemas"
import resolvers from "./resolvers"

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
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
