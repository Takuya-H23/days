import { Pool } from "pg"
const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

let client

async function init() {
  client = await pool.connect()
}

init()

export default {
  Query: {
    users: async () => {
      const users = await client.query("SELECT * FROM users")
      return users.rows
    }
  }
}
