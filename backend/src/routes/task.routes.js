import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
  updateTaskController,
} from "../controllers/task.controller.js";
import authUser from "../middleware/auth.middleware.js";

const taskRoute = Router();

/**
 * @route GET api/v1/tasks/:projectId
 * @description Fetches all tasks of a project
 * @access Private
 */
taskRoute.get("/:projectId", authUser, getTasksController);

/**
 * @route POST api/v1/tasks
 * @description Create new task
 * @access Private
 */
taskRoute.post("/", authUser, createTaskController);

/**
 * @route PATCH api/v1/tasks/:id
 * @description Create new task
 * @access Private
 */
taskRoute.patch("/:id", authUser, updateTaskController);

/**
 * @route DELETE api/v1/tasks/:id
 * @description Deteles the selected task
 * @access Private
 */
taskRoute.delete("/:id", authUser, deleteTaskController);

export default taskRoute;
