import { hash } from 'bcryptjs'
import { users } from '../../../src/utils/functions'

const { extractUser, setAuthCookie, ben } = users

const query =
  'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING user_id, username, email, created_at'

export default async function signUp(_, { input }, { cookies, pool }) {
  const { username, email, password } = input
  const hashed = await hash(password, 10)

  const res = await pool.query(query, [username, email, hashed])

  const user = extractUser(res)

  setAuthCookie(cookies)({ id: user.user_id, secret: process.env.JWT_SECRET })()

  return user
}
