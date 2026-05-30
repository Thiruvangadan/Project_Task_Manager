import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectsController,
} from "../controllers/project.controller.js";
import authUser from "../middleware/auth.middleware.js";

const projectRoute = Router();

/**
 * @route GET api/v1/projects
 * @description Fetches all projects
 * @access Private
 */
projectRoute.get("/", authUser, getProjectsController);

/**
 * @route POST api/v1/projects
 * @description Create new project
 * @access Private
 */
projectRoute.post("/", authUser, createProjectController);

/**
 * @route DELETE api/v1/projects/:id
 * @description Deteles the selected project
 * @access Private
 */
projectRoute.delete("/:id", authUser, deleteProjectController);

export default projectRoute;
