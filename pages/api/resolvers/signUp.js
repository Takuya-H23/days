import { hash } from 'bcryptjs'
import Either from 'crocks/Either'
import { users } from '../../../src/utils/functions'
import { errors } from '../../../src/utils/procedures'

const { signUpUser, genToken, setAuthCookie } = users

export default async function signUp(_, { input }, { cookies, pool }) {
  const { username, email, password } = input
  const hashed = await hash(password, 10)
  const generateToken = genToken(process.env.JWT_SECRET)

  const userEither = await signUpUser(pool, [username, email, hashed])
    .toPromise()
    .then(Either.Right)
    .catch(Either.Left)

  const setCookie = ({ user, token }) => (
    setAuthCookie(cookies)(token).run(), user
  )

  return userEither
    .map(user => ({
      user,
      token: generateToken(user.user_id)
    }))
    .either(errors.throwDetailError, setCookie)
}
