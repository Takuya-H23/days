import { Pool } from 'pg'
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

export default {
  Query: {
    user: async () => {
      const user = await pool.query('SELECT * FROM users')

      return user.rows[0]
    }
  },
  Mutation: {
    signUp: async (_, { input }) => {
      const { username, full_name, email, password } = input
      const user = await pool.query(
        'INSERT INTO users (username, full_name, email, password, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING username, full_name, email, created_at',
        [username, full_name, email, password]
      )
      return { user: user.rows[0] }
    }
  }
}
