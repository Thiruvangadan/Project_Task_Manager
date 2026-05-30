import db from "../config/db.js";

/**
 * @name getProjectsController
 * @description Fetches the projects
 * @access Public
 */
export const getProjectsController = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC`,
      [req.user.id],
    );

    res.status(200).json({
      success: true,
      message: "Projects fectched successfully",
      count: result.rows.length,
      projects: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @name createProjectController
 * @description Creates new project, expects title and description
 * @access Public
 */
export const createProjectController = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "All inputs are required",
      });
    }

    const result = await db.query(
      `INSERT INTO projects(
      title,
      description,
      user_id
      ) VALUES ($1,$2,$3) RETURNING *`,
      [title, description, req.user.id],
    );

    const project = result.rows[0];

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @name deleteProjectController
 * @description Deletes selected project, expects project ID
 * @access Public
 */
export const deleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query(
      `DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING *`,
      [id, req.user.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
