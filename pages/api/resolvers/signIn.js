import { compareSync } from 'bcryptjs'
import Either from 'crocks/Either'
import { users } from '../../../src/utils/functions'
import { errors } from '../../../src/utils/procedures'

const { genToken, setAuthCookie, signInUser } = users

const notFound = {
  detail: 'User not found. Please make sure your email and password are correct'
}

export default async function (_, { input }, { cookies, pool }) {
  const { email, password } = input
  // eslint-disable-next-line no-undef
  const generateToken = genToken(process.env.JWT_SECRET)

  const setCookie = ({ user, token }) => (
    setAuthCookie(cookies)(token).run(), user
  )

  const userEither = await signInUser(pool, [email])
    .toPromise()
    .then(user => (user ? Either.Right(user) : Either.Left(notFound)))
    .catch(Either.Left)

  return userEither
    .chain(user =>
      compareSync(password, user.password)
        ? Either.Right(user)
        : Either.Left(notFound)
    )
    .map(user => ({ user, token: generateToken(user.user_id) }))
    .either(errors.throwDetailError, setCookie)
}
