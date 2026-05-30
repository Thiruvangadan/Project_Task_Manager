import db from "../config/db.js";

/**
 * @name getTasksController
 * @description Fetches all the tasks
 * @access Private
 */
export const getTasksController = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await db.query(
      `SELECT * FROM projects WHERE id = $1 AND user_id = $2`,
      [projectId, req.user.id],
    );

    if (project.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const result = await db.query(
      `SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC`,
      [projectId],
    );

    res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      count: result.rows.length,
      tasks: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @name createTaskController
 * @description Creates new task, expects title and due date(optional)
 * @access Private
 */
export const createTaskController = async (req, res) => {
  try {
    const { title, projectId, due_date } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const project = await db.query(
      `
        SELECT *
        FROM projects
        WHERE id = $1
        AND user_id = $2
        `,
      [projectId, req.user.id],
    );

    if (project.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const result = await db.query(
      `INSERT INTO tasks(title,project_id,due_date)VALUES($1, $2,$3) RETURNING *`,
      [title, projectId, due_date],
    );

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @name updateTaskController
 * @description Updates status of task
 * @access Private
 */
export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await db.query(
      `SELECT * FROM tasks JOIN projects ON tasks.project_id = projects.id WHERE tasks.id = $1 AND projects.user_id = $2`,
      [id, req.user.id],
    );

    if (task.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const result = await db.query(
      `UPDATE tasks SET completed =  NOT completed WHERE id = $1 RETURNING *`,
      [id],
    );

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      task: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @name deleteTaskController
 * @description Deletes selected task, expects task ID
 * @access Private
 */
export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `DELETE FROM tasks USING projects WHERE tasks.project_id = projects.id AND tasks.id = $1 AND projects.user_id = $2 RETURNING tasks.*`,
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
