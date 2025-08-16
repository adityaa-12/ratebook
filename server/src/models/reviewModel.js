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
      ref: "users",
      required: true,
      unique: true,
      trim: true,
    },
    userid: {
      type: String,
      ref: "users",
      required: true,
      unique: true,
      trim: true,
    },
    bookid: {
      type: String,
      ref: "books",
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
