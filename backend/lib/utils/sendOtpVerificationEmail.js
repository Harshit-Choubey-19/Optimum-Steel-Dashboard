import bcrypt from "bcryptjs";
import UserOtpVerification from "../../models/userOtpVerification.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

//nodemailer stuff
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

// transporter.verify((error, success) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//     console.log(success);
//   }
// });

export const sendOtpVerificationEmail = async (user, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);

    let mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject: "Verify your email",
      html: `<p>Hello <b>${user.fullName}</b></p><p>Please Enter <b>${otp}</b> to verify your email address.</p><p>This code <b>expires in 1 hour</b>.</p>`,
    };

    let info = await transporter.sendMail(mailOptions);
    if (info.rejected.length > 0) {
      console.log(
        `Error sending email to ${user.email}: ${info.rejected[0].response}`
      );
      return false; // OTP sending failed
    } else if (info.accepted.length > 0) {
      const newOtpVerification = new UserOtpVerification({
        userId: user._id,
        otp: hashedOtp,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });
      await newOtpVerification.save();
      return true; // OTP sent successfully
    } else {
      console.log("Error sending email: unknown error");
      return false; // OTP sending failed
    }
  } catch (error) {
    console.log("Error in sendOtpVerificationEmail", error.message);
    res.status(500).json({ error: "Internal server error" });
    return false; // OTP sending failed
  }
};
