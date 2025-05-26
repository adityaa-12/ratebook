import db from "../config/db.js";

export async function getReviewsByBookId(bookId) {
  const [rows] = await db.execute("SELECT * FROM REVIEWS WHERE BOOK_ID = ?", [
    bookId,
  ]);
  return rows;
}

export async function getReviewByUserId(userId) {
  const [rows] = await db.execute("SELECT * FROM REVIEWS WHERE USER_ID = ?", [
    userId,
  ]);
  return rows;
}

export async function getAvgRatingById(bookId) {
  const [result] = await db.execute("SELECT AVG(RATING) AS averageRating FROM REVIEWS WHERE BOOK_ID = ?", [bookId]);
  return result[0].averageRating;
}

export async function addReview(newReview) {
  const { userId, bookId, rating, comment } = newReview;
  const [result] = await db.execute(
    "INSERT INTO REVIEWS (USER_ID, BOOK_ID, RATING, COMMENT) VALUES (?,?,?,?)",
    [userId, bookId, rating, comment]
  );
  return { id: result.insertId, ...newReview };
}
