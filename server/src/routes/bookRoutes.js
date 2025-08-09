import express from "express";
import { bookCreate, fetchBooks, searchBook, updateBook } from "../controllers/bookControl.js";

const router = express.Router();

router.post("/", bookCreate);

router.get("/", fetchBooks);

router.get("/search", searchBook);

router.put("/update/:id", updateBook);


export default router;