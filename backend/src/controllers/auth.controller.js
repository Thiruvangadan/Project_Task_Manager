import db from "../config/db.js";
import generateToken from "../utils/generateToken.js";
import generateOtp from "../utils/sendOtp.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";

/**
 * @name registerUserController
 * @description Register a new user, expects name, email in req body
 * @access Public
 */
export const registerUserController = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isAlreadyRegistered = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    if (
      isAlreadyRegistered.rows.length > 0 &&
      isAlreadyRegistered.rows[0].is_verified
    ) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered, Kindly login",
      });
    }

    const { otp } = await generateOtp();

    if (
      isAlreadyRegistered.rows.length > 0 &&
      !isAlreadyRegistered.rows[0].is_verified
    ) {
      await db.query(`UPDATE users SET otp = $1 WHERE email = $2`, [
        otp,
        email,
      ]);
    } else {
      await db.query(`INSERT INTO users (name,email,otp) VALUES($1,$2,$3)`, [
        name,
        email,
        otp,
      ]);
    }

    await sendOtpEmail(name, email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @name verifyOtpController
 * @description Verifies entered OTP
 * @access Public
 */

export const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result.rows[0];

    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    await db.query(
      `UPDATE users SET is_verified = true, otp = NULL WHERE email = $1`,
      [email],
    );

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "OTP Valid, User logged in",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @name loginUserController
 * @description Login a user, expects email in req body
 * @access Public
 */

export const loginUserController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!result.rows[0]?.is_verified) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { otp } = await generateOtp();

    await db.query(`UPDATE users SET otp = $1 WHERE email = $2`, [otp, email]);

    await sendOtpEmail(result.rows[0].name, email, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @name logoutUserController
 * @description Logout a user and clear the token
 * @access Public
 */

export const logoutUserController = async (req, res) => {
  res.status(200).json({ success: true, message: "Logout successful" });
};

/**
 * @name getMeUserController
 * @description get current logged in user
 * @access Private
 */

export const getMeUserController = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [req.user.id],
    );

    const user = result.rows[0];
    res.status(200).json({
      success: true,
      message: "Token verified",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
