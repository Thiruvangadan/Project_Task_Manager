import express from "express";
import cors from "cors";
import createSchemas from "./utils/createSchemas.js";
import authRoute from "./routes/auth.routes.js";
import projectRoute from "./routes/project.routes.js";
import taskRoute from "./routes/task.routes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());
createSchemas();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/projects", projectRoute);
app.use("/api/v1/tasks", taskRoute);

export default app;
