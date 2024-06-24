import express from "express";
import {
  signup,
  login,
  logout,
  getMe,
  verifyOtp,
  resendOtp,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verifyOtp", protectRoute, verifyOtp);
router.post("/resendOtp", protectRoute, resendOtp);

export default router;
