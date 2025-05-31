import {
  addReview,
  getAvgRatingById,
  getReviewByUserId,
  getReviewsByBookId,
} from "../models/reviewModel.js";

export async function getRevForUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const userReviews = await getReviewByUserId(userId);

    if (!userReviews || userReviews.length === 0) {
      return res.json({
        message: "Reviews not found!",
      });
    }

    return res.json({
      userRevData: userReviews,
    });
  } catch (error) {
     return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
}

export async function getRevForBook(req, res) {
  try {
    const bookId = parseInt(req.params.id);
    const bookReviews = await getReviewsByBookId(bookId);
    const averageRating = await getAvgRatingById(bookId);

    if (!bookReviews || bookReviews.length === 0) {
      return res.json({
        message: "Reviews not found!",
      });
    }

    return res.json({
      bookData: bookReviews,
      rating: averageRating ? parseFloat(averageRating) : null,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
}

export async function addNewRev(req, res) {
  try {
    const { userId, bookId, rating, comment } = req.body;

    if (!userId && !bookId && !rating && !comment) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const newRev = {
      userId: userId,
      bookId: bookId,
      rating: rating,
      comment: comment,
    };
    const setRev = await addReview(newRev);

    if (!setRev) {
      return res.status(400).json({
        message: "Failed to submit review!",
      });
    }

    return res.status(200).json({
      message: "New Review has been added!",
    });
  } catch (error) {
     return res.status(500).json({
      message: "Internal Server Error",
      err: error.message,
    });
  }
}
