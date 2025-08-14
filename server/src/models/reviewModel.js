import mongoose from "mongoose";

const createReview = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    authorid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Reviews", createReview);
