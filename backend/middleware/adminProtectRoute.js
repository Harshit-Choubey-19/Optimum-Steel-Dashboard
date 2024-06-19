import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const adminProtectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized! Login first" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized! Login first" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user || user.role !== "admin") {
      return res
        .status(401)
        .json({ error: "Unauthorized! You are not an admin" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in adminProtectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
