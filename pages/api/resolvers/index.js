import { Pool } from 'pg'
import { hash } from 'bcryptjs'
import jwt from 'jsonwebtoken'

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

export default {
  Query: {
    user: async () => {
      const user = await pool.query('SELECT * FROM users')
      console.log('hit?')

      return user.rows[0]
    }
  },
  Mutation: {
    signUp: async (_, { input }, { cookies }) => {
      const { username, email, password } = input
      const hashed = await hash(password, 10)

      const res = await pool.query(
        'INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING username, email, created_at',
        [username, email, hashed]
      )

      const user = res.rows[0]
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

      cookies.set('auth-token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 6 * 60 * 60
      })

      return user
    }
  }
}
