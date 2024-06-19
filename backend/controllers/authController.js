import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { sendOtpVerificationEmail } from "../lib/utils/sendOtpVerificationEmail.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    const existingemail = await User.findOne({ email });
    if (existingemail) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }
    //hashed password
    const randomNum = Math.floor(Math.random() * 11) + 10; //random num between 10 to 20
    const salt = await bcrypt.genSalt(randomNum);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    let otpSent = await sendOtpVerificationEmail(newUser, res);
    console.log("otpcheck:", otpSent);

    if (!otpSent) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    res.json({
      status: "PENDING",
      message: "Otp sent to your email. Please verify your email address.",
      date: {
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        role: newUser.role,
        email: newUser.email,
        verified: newUser.verified,
      },
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
      role: user.role,
      verified: user.verified,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe function", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
