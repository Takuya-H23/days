import { compare } from 'bcryptjs'

const signInQuery = 'SELECT * FROM users WHERE email = $1'

export default async function (_, { input }, { cookies, pool }) {
  const { email, password } = input
  const user = await pool.query(signInQuery, [email])
  console.log(user)

  return { username: 'hey', email: 'hey', created_at: 'hey' }
}
