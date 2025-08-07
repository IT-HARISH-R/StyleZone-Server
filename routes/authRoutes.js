import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
// authRoutes.post("/verify-otp", verifyOTP);
// authRoutes.post("/forgot-password", forgotPassword);
// authRoutes.post("/reset-password", resetPassword);

export default authRoutes;