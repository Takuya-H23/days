import { hash } from 'bcryptjs'
import { users } from '../../../src/utils/functions'

const { extractUser, genToken } = users

export default async function signUp(_, { input }, { cookies, pool }) {
  const { username, email, password } = input
  const hashed = await hash(password, 10)

  const res = await pool.query(
    'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING username, email, created_at',
    [username, email, hashed]
  )

  const user = extractUser(res)
  const token = genToken(process.env.JWT_SECRET, user.id)

  cookies.set('auth-token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 6 * 60 * 60
  })

  return user
}
