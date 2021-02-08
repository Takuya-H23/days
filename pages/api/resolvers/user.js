import { isNil } from 'ramda'

export default async function user(_, __, { userId }) {
  if (isNil(userId)) {
    throw new Error('error')
  }
  return { user_id: 'id', username: 'hi', email: 'hi', created_at: 'hi' }
}
