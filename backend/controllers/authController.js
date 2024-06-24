import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { sendOtpVerificationEmail } from "../lib/utils/sendOtpVerificationEmail.js";
import User from "../models/user.js";

import bcrypt from "bcryptjs";
import validator from "validator";
import UserOtpVerification from "../models/userOtpVerification.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

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

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
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

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    const mailSent = await sendOtpVerificationEmail(newUser, res);
    if (!mailSent) {
      return res
        .status(500)
        .json({ error: "Failed to send verification email" });
    }

    res.json({
      status: "PENDING",
      message:
        "An Otp sent to your email address, please verify(Check your spam if its not visible in inbox).",
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

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide both username and password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    if (!user.verified) {
      let otpRecord = await UserOtpVerification.findOne({ userId: user._id });
      if (!otpRecord) {
        const emailSent = await sendOtpVerificationEmail(user, res);

        if (emailSent) {
          return res
            .status(200)
            .json({ message: "An Otp sent to your email please verify!" });
        } else {
          return res.status(400).json({ error: "Could not send otp!" });
        }
      } else {
        return res
          .status(200)
          .json({ message: "otp already sent please verify!" });
      }
    }

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

// export const resendEmail = async (req, res) => {
//   try {
//     const authUserId = req.user._id;
//     const user = await User.findById(authUserId);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (!user.verified) {
//       let token = await EmailToken.findOne({ userId: user._id });
//       if (!token) {
//         const emailToken = await new EmailToken({
//           userId: user._id,
//           token: crypto.randomBytes(32).toString("hex"),
//         });

//         await emailToken.save();

//         const url = `${process.env.BASE_URL}user/${user._id}/verify/${emailToken.token}`;
//         await sendEmail(user.email, "Verify Email", url, user);
//       } else {
//         const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
//         await sendEmail(user.email, "Verify Email", url, user);
//       }

//       return res
//         .status(400)
//         .json({ message: "An email sent to your account please verify!" });
//     } else {
//       return res.status(400).json({ error: "Your email is already verified" });
//     }
//   } catch (error) {
//     console.log("Error in resendEmail:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!otp) {
      return res.status(400).json({ error: "Otp is required" });
    } else {
      const userOtpVerificationRecord = await UserOtpVerification.find({
        userId,
      });
      if (userOtpVerificationRecord.length <= 0) {
        return res.status(404).json({
          error:
            "Account record doesn't exist or already verified. Please login or signup!",
        });
      } else {
        const { expiresAt } = userOtpVerificationRecord[0];
        const hashedOtp = userOtpVerificationRecord[0].otp;

        if (expiresAt < Date.now()) {
          await UserOtpVerification.deleteMany({ userId });
          return res
            .status(404)
            .json({ error: "Otp expired! Please request again" });
        } else {
          const isValid = await bcrypt.compare(otp, hashedOtp);

          if (!isValid) {
            return res
              .status(400)
              .json({ error: "Invalid OTP! Check your inbox" });
          } else {
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOtpVerification.deleteMany({ userId });
            return res.status(200).json({
              message: "User email verified successfully!",
              data: {
                verified: true,
              },
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.verified) {
      return res.status(400).json({ error: "User already verified" });
    }

    const otpRecord = await UserOtpVerification.find({ userId });

    if (otpRecord) {
      await UserOtpVerification.deleteMany({ userId });
    }

    const emailSent = await sendOtpVerificationEmail(user, res);
    if (emailSent) {
      return res
        .status(200)
        .json({ message: "An Otp resent to your email please verify!" });
    } else {
      return res.status(400).json({ error: "Could not send otp!" });
    }
  } catch (error) {
    console.log("Error in resendOtp:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};
