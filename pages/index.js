import { useEffect } from "react"
import { useQuery } from "react-query"
import { request, gql } from "graphql-request"
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
            username
            full_name
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
      <pre>{JSON.stringify(users)}</pre>
    </Layout>
  )
}
