import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createAuctionItem,
  deleteAuctionItem,
  getAuctionItems,
  getSingleAuctionItem,
  userBid,
} from "../controllers/auctionController.js";
import { adminProtectRoute } from "../middleware/adminProtectRoute.js";

const router = express.Router();

router.get("/", protectRoute, getAuctionItems);
router.get("/:id", protectRoute, getSingleAuctionItem);
router.post("/create", adminProtectRoute, createAuctionItem);
router.post("/:id/bid", protectRoute, userBid);
router.delete("/:id", adminProtectRoute, deleteAuctionItem);

export default router;
