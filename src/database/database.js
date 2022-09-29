import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const connection = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: 'localhost',
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME
});


export default connection