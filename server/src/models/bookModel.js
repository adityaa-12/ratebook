import mongoose from "mongoose";

const createBook = new mongoose.Schema(
  {
    id: String,
    title: { type: String, required: true },
    authorid: { type: String, ref: "users" },
    description: String,
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("books", createBook);
