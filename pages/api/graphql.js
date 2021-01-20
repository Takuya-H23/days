import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
})

export default async (req, res) => {
  const client = await pool.connect()
  const users = await client.query("SELECT * FROM users")

  res.json({
    status: "ok",
    users
  })
}
