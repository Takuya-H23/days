import { useEffect } from "react"
import { useQuery } from "react-query"
import { request, gql } from "graphql-request"
import { Typography } from "@material-ui/core"
import { Layout } from "../src/components"

const endpoint = "/api/graphql"

function useUsers() {
  return useQuery("users", async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          users {
            user_id
            full_name
            last_login
            created_at
          }
        }
      `
    )
    return data
  })
}

export default function Index() {
  const { status, data, error, isFetching } = useUsers()
  if (isFetching) return <div>Loading...</div>
  const { users } = data

  return (
    <Layout>
      <Typography variant="h1" align="center">
        Days
      </Typography>
      <pre>{JSON.stringify(users)}</pre>
    </Layout>
  )
}
