import { useEffect } from "react"
import Router from "next/router"
import { useQuery } from "react-query"
import { request, gql } from "graphql-request"

const endpoint = "/api/graphql"

function fetchUsers() {
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

export default function useUser(redirectTo) {
  const { status, data, error, isFetching } = fetchUsers()

  useEffect(() => {}, [isFetching, redirectTo])

  return { user, isFetching, error }
}
