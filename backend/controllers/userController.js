import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.js";
import UserOtpVerification from "../models/userOtpVerification.js";
import { sendOtpVerificationEmail } from "../lib/utils/sendOtpVerificationEmail.js";
import nodemailer from "nodemailer";

//nodemailer stuff
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

export const updateUser = async (req, res) => {
  const { fullName, username, currentPassword, newPassword } = req.body;
  let { profileImg } = req.body;
  const userId = req.user._id;
  try {
    //mail options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: req.user.email,
      subject: "User Profile updated",
      html: `<p>Your password was changed.</p>`,
    };

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    if (!user.verified) {
      return res.status(400).json({ error: "Please verify your email first" });
    }

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Please provide both current and new password" });
    }

    if (newPassword && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const randomNum = Math.floor(Math.random() * 11) + 10; //random num between 10 to 20
      const salt = await bcrypt.genSalt(randomNum);
      user.password = await bcrypt.hash(newPassword, salt);
      await transporter.sendMail(mailOptions);
    }

    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedImage = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedImage.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.profileImg = profileImg || user.profileImg;

    user = await user.save();

    //password should be null in response
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    if (!userId || !otp) {
      return res
        .status(400)
        .json({ error: "Empty otp details are not allowed" });
    } else {
      const userOtpVerificationRecords = await UserOtpVerification.find({
        userId,
      });

      if (userOtpVerificationRecords.length <= 0) {
        return res.status(404).json({
          error:
            "Account record doesn't exist or has been verified already. Please signup or login",
        });
      } else {
        const { expiresAt } = userOtpVerificationRecords[0];
        const hashedOtp = userOtpVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOtpVerification.deleteMany({ userId });
          return res.status(400).json({ error: "Otp has expired" });
        } else {
          const validOtp = await bcrypt.compare(otp, hashedOtp);

          if (!validOtp) {
            return res
              .status(400)
              .json({ error: "Invalid Otp. Check your email inbox." });
          } else {
            //success
            await User.updateOne({ _id: userId }, { verified: true });
            await UserOtpVerification.deleteMany({ userId });

            res.json({
              status: "VERIFIED",
              message: "Email verified successfully",
            });
          }
        }
      }
    }
  } catch (error) {
    console.log("Error in verifyOtp", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserOtpVerification.deleteMany({ userId });
    sendOtpVerificationEmail(user, res);
  } catch (error) {
    console.log("Error in resendOtp", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
