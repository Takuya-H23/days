import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

async function init() {
  return await pool.connect()
}

const client = init()

export default client
