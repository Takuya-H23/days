import { compareSync } from 'bcryptjs'
import Either from 'crocks/Either'
import { identity } from 'ramda'
import { users } from '../../../src/utils/functions'

const { signInUser } = users
const notFound = {
  detail: 'User not found. Please make sure your email and password are correct'
}

const getError = e => {
  // eslint-disable-next-line functional/no-throw-statement
  throw new Error(e.detail || 'Something went wrong from getError...')
}

export default async function (_, { input }, { cookies, pool }) {
  const { email, password } = input
  const userEither = await users
    .signInUser(pool, [email])
    .toPromise()
    .then(user => (user ? Either.Right(user) : Either.Left(notFound)))
    .catch(Either.Left)

  return userEither
    .chain(user =>
      compareSync(password, user.password)
        ? Either.Right(user)
        : Either.Left(notFound)
    )
    .either(getError, identity)

  // return { username: 'hey', email: 'hey', created_at: 'hey' }
}
