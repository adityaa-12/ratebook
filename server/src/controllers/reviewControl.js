import Reviews from "../models/reviewModel.js";

// Create Review

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

// Delete Review By ID

export const deleteReview = async (req, res) => {
  try {
    let revId = req.params.id;

    let findRev = await Reviews.findOne({ id: revId });

    if (!findRev) {
      return res.status(400).json({
        message: "Review not found!",
      });
    }

    let delRev = await Reviews.findOneAndDelete(revId);

    if (!delRev) {
      return res.status(400).json({
        message: "Something went wrong, while deleting review",
      });
    }

    return res.status(200).json({
      message: "Review Deleted!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Update Review By ID

export const updateRev = async (req, res) => {
  try {
    let revBody = req.body;
    let revId = req.params.id;

    if (!revBody) {
      return res.status(200).json({
        message: "Data Required",
      });
    }

    const updateReview = await Reviews.findOneAndUpdate({ id: revId }, revBody, {
      new: true,
    });

    if (!updateReview) {
      return res.status(404).json({
        message: "Review Not Found",
      });
    }

    return res.status(200).json({
      message: "Review Updated Successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Get Review By ID For App

export const getRevApp = async (req, res) => {
  try {
    let revId = req.params.id;

    if (!revId) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let findRev = await Reviews.find({ id: revId });

    if (findRev == 0) {
      return res.status(400).json({
        message: "Reviews not found!",
      });
    }

    return res.status(200).json({
      data: findRev,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

