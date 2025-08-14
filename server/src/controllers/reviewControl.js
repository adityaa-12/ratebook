import Reviews from "../models/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    let reviewBody = req.body;

    if (!reviewBody) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let saveReview = await Reviews.create(reviewBody);

    if (!saveReview) {
      return res.status(400).json({
        message: "Failed to Submit Review",
      });
    }

    return res.status(200).json({
      message: "Review Submitted!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
