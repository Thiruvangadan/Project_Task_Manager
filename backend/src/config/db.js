import "./env.config.js";
import pkg from "pg";

const { Pool } = pkg;

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

try {
  await db.connect();
  console.log("Database connected successfully");
} catch (error) {
  console.error("Database connection failed", error);
  process.exit(1);
}

export default db;
