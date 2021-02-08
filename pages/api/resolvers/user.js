import Async from 'crocks/Async'
import Either from 'crocks/Either'
import { identity } from 'ramda'
import { getUser } from '../../../src/utils/functions/users'
import { errors } from '../../../src/utils/procedures'

export default async function user(_, __, { userIdEither, pool }) {
  const getUserById = userIdEither.either(Async.Rejected, userId =>
    getUser(pool, [userId])
  )
  const userEither = await getUserById
    .toPromise()
    .then(user => (user ? Either.Right(user) : Either.Left('not found')))
    .catch(Either.Left)

  return userEither.either(errors.genError, identity)

  // return { user_id: 'id', username: 'hi', email: 'hi', created_at: 'hi' }
}
