import express from "express";
import { adminProtectRoute } from "../middleware/adminProtectRoute.js";
import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/create", adminProtectRoute, createProduct);
router.patch("/:id", adminProtectRoute, updateProduct);
router.delete("/:id", adminProtectRoute, deleteProduct);

export default router;
