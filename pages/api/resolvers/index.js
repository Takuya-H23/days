import signUp from './signUp'

export default {
  Query: {
    user: async () => {
      const user = await pool.query('SELECT * FROM users')

      return user.rows[0]
    }
  },
  Mutation: {
    signUp
  }
}
