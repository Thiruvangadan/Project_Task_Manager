import { Router } from "express";
import {
  getMeUserController,
  loginUserController,
  logoutUserController,
  verifyOtpController,
  registerUserController,
} from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";

const authRoute = Router();

/**
 * @route POST api/v1/auth/register
 * @description Register a new user
 * @access Public
 */
authRoute.post("/register", registerUserController);

/**
 * @route POST api/v1/auth/verify-otp
 * @description Verifies entered OTP
 * @access Public
 */
authRoute.post("/verify-otp", verifyOtpController);

/**
 * @route POST api/v1/auth/login
 * @description Login user with email and OTP
 * @access Public
 */
authRoute.post("/login", loginUserController);

/**
 * @route GET api/v1/auth/logout
 * @description Logout user
 * @access Public
 */
authRoute.get("/logout", logoutUserController);

/**
 * @route GET api/v1/auth/me
 * @description Get current logged in user details
 * @access Private
 */
authRoute.get("/me", authUser, getMeUserController);

export default authRoute;
