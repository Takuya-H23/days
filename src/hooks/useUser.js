import { useEffect } from 'react'
import Router from 'next/router'
import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const endpoint = '/api/graphql'

function fetchUser() {
  return useQuery('user', async () => {
    const data = await request(
      endpoint,
      gql`
        query {
          user {
            user_id
            username
            email
            created_at
          }
        }
      `
    )
    return data
  })
}

export default function useUser(redirectTo) {
  return fetchUser()
  // const { status, data, error, isFetching } = fetchUsers()

  // useEffect(() => {}, [isFetching, redirectTo])

  // return { user, isFetching, error }
}
