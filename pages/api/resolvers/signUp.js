import { hash } from 'bcryptjs'
import { tryCatch } from 'ramda'
import { users } from '../../../src/utils/functions'

const { extractUser, setAuthCookie } = users

const query =
  'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING user_id, username, email, created_at'

export default async function signUp(_, { input }, { cookies, pool }) {
  const { username, email, password } = input
  const hashed = await hash(password, 10)

  try {
    const res = await pool.query(query, [username, email, hashed])
    const user = extractUser(res)

    setAuthCookie(cookies)({
      id: user.user_id,
      secret: process.env.JWT_SECRET
    }).run()

    return user
  } catch (e) {
    return e
  }
}
