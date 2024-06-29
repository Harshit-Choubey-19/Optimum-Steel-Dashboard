import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.js";
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
  const { fullName, currentPassword, newPassword } = req.body;
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

      if (newPassword === currentPassword) {
        return res
          .status(400)
          .json({ error: "New password cannot be same as current password" });
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

// export const verifyEmailLink = async (req, res) => {
//   try {
//     let user = await User.findOne({ _id: req.params.id });

//     if (!user) {
//       return res.status(404).json({ error: "Invalid Link!" });
//     }

//     const token = await EmailToken.findOne({
//       userId: user._id,
//       token: req.params.token,
//     });

//     if (!token) {
//       return res
//         .status(404)
//         .json({ error: "Invalid Link or user already verified!" });
//     }

//     await User.updateOne({ _id: user._id }, { $set: { verified: true } });
//     await EmailToken.deleteMany({ userId: user._id });

//     res.status(200).json({
//       message: "Email verified Succeffully",
//       data: {
//         _id: user._id,
//         fullName: user.fullName,
//         role: user.role,
//         verified: true,
//       },
//     });
//   } catch (error) {
//     console.log("Error in verifyEmail:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
