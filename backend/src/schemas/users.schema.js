import db from "../config/db.js";

export const createUsersSchema = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS users (
                  id SERIAL PRIMARY KEY,
                  name VARCHAR(50) NOT NULL,
                  email VARCHAR(100) UNIQUE NOT NULL,
                  otp TEXT,
                  is_verified BOOLEAN DEFAULT FALSE,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );
                `;

    await db.query(query);
  } catch (error) {
    console.error("Failed to create users schema", error);
    process.exit(1);
  }
};
