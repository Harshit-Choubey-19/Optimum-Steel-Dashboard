import mongoose from "mongoose";

const userOtpVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

const UserOtpVerification = mongoose.model(
  "UserOtpVerification",
  userOtpVerificationSchema
);

export default UserOtpVerification;
