import db from "../config/db.js";

export const createTasksSchema = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS tasks (
                  id SERIAL PRIMARY KEY,
                  project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
                  title VARCHAR(100) NOT NULL,
                  completed BOOLEAN DEFAULT FALSE,
                  due_date DATE,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                  );
                `;

    await db.query(query);
  } catch (error) {
    console.error("Failed to create tasks schema", error);
    process.exit(1);
  }
};
