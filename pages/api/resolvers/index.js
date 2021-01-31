import signUp from './signUp'

export default {
  Query: {
    // eslint-disable-next-line no-unused-vars
    user: async (_, args) => {
      const user = await pool.query('SELECT * FROM users')

      return user.rows[0]
    }
  },
  Mutation: {
    signUp
  }
}
