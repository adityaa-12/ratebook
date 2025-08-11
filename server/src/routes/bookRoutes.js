import express from "express";
import {
  bookCreate,
  deleteBook,
  fetchBooks,
  searchBook,
  updateBook,
} from "../controllers/bookControl.js";

const router = express.Router();

router.post("/add", bookCreate);

router.get("/", fetchBooks);

router.get("/search", searchBook);

router.put("/update/:id", updateBook);

router.delete("/delete/:id", deleteBook);

export default router;
