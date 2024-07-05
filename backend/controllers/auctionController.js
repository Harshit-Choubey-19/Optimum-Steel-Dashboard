import AuctionItem from "../models/auctionItem.js";
import User from "../models/user.js";
import { v2 as cloudinary } from "cloudinary";

export const getAuctionItems = async (req, res) => {
  try {
    const auctionItem = await AuctionItem.find().sort({ createdAt: -1 });

    if (auctionItem.legth === 0) {
      return res.status(404).json([]);
    }
    return res.status(200).json(auctionItem);
  } catch (error) {
    console.log("Error in getAuctionItems:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSingleAuctionItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const auctionItem = await AuctionItem.findById(itemId);

    if (!auctionItem) {
      return res.status(404).json({ error: "Auction item not found" });
    }
    return res.status(200).json(auctionItem);
  } catch (error) {
    console.log("Error in getSingleAuctionItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAuctionItem = async (req, res) => {
  try {
    const { title, description, startPrice, startDate, endDate } = req.body;
    const { image } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (!title || !description || !startPrice) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      image = result.secure_url;
    }

    const newAuctionItem = new AuctionItem({
      owner: userId,
      title,
      description,
      startPrice,
      startDate,
      endDate,
      image,
    });

    await newAuctionItem.save();
    return res.status(201).json(newAuctionItem);
  } catch (error) {
    console.log("Error in createAuctionItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const userBid = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (user.role === "admin") {
      return res.status(403).json({ error: "Admins can't bid" });
    }

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const auctionItem = await AuctionItem.findById(id);
    if (!auctionItem) {
      return res.status(404).json({ error: "Auction item not found!" });
    }

    if (Date.now() > new Date(auctionItem.endDate)) {
      return res.status(400).json({ error: "Auction has ended" });
    }

    if (amount < auctionItem.startPrice) {
      return res
        .status(400)
        .json({ error: "Amount must not be less than start price" });
    }

    if (amount <= auctionItem.highestBid.amount) {
      return res
        .status(400)
        .json({ error: "Amount must be greater than highest bid" });
    }

    if (auctionItem.highestBid.user) {
      if (userId.toString() === auctionItem.highestBid.user.toString()) {
        return res
          .status(400)
          .json({ error: "You have already the highest bid" });
      }
    }

    auctionItem.bids.push({ user: userId, amount });

    if (amount > auctionItem.highestBid.amount || null) {
      auctionItem.highestBid = { amount, user: userId };
    }
    await auctionItem.save();
    return res.status(201).json(auctionItem);
  } catch (error) {
    console.log("Error in userBid:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAuctionItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id.toString();

    const auctionItem = await AuctionItem.findById(id);
    if (!auctionItem) {
      return res.status(404).json({ error: "Auction item not found!" });
    }

    if (auctionItem.owner.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "You are not the owner of this auction item" });
    }

    if (auctionItem.image) {
      const imgId = auctionItem.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await AuctionItem.findByIdAndDelete(id);

    return res.status(200).json({ message: "Auction Item Deleted" });
  } catch (error) {
    console.log("Error in deleteAuctionItem:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
