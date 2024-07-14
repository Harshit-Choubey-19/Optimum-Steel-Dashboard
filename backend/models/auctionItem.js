import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const auctionItemSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    itemName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    startPrice: {
      type: Number,
      required: true,
    },
    highestBid: {
      amount: {
        type: Number,
        default: null,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    bids: [bidSchema],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);
export default AuctionItem;
