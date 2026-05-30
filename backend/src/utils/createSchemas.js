import { createProjectsSchema } from "../schemas/projects.schema.js";
import { createTasksSchema } from "../schemas/tasks.schema.js";
import { createUsersSchema } from "../schemas/users.schema.js";

const createSchemas = async () => {
  try {
    await createUsersSchema();
    await createProjectsSchema();
    await createTasksSchema();
    console.log("All schemas created successfully");
  } catch (error) {
    console.error("Failed to create schemas", error);
    process.exit(1);
  }
};

export default createSchemas;
