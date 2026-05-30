import db from "../config/db.js";

export const createProjectsSchema = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS projects (
                  id SERIAL PRIMARY KEY,
                  user_id INTEGER REFERENCES users(id),
                  title VARCHAR(100) NOT NULL,
                  description TEXT,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );
                `;

    await db.query(query);
  } catch (error) {
    console.error("Failed to create projects schema", error);
    process.exit(1);
  }
};
