import Async from 'crocks/Async'
import { queryUser } from '../../../src/utils/functions/users'

export default async function user(_, __, { userIdEither, pool }) {
  return { user_id: 'id', username: 'hi', email: 'hi', created_at: 'hi' }
}
