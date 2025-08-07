import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  me
} from "../controllers/authController.js";
import auth from "../middlewares/auth.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/me", auth.checkAuth, me);
// authRoutes.post("/verify-otp", verifyOTP);
// authRoutes.post("/forgot-password", forgotPassword);
// authRoutes.post("/reset-password", resetPassword);

export default authRoutes;