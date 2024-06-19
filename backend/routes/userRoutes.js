import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  resendOtp,
  updateUser,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/update", protectRoute, updateUser);
router.post("/verifyOtp", protectRoute, verifyOtp);
router.post("/resendOtp", protectRoute, resendOtp);

export default router;
