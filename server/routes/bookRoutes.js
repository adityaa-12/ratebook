import express from "express";

import { AddNewBook, fetchAllBooks, FetchSingleBook } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", fetchAllBooks);

router.get("/:id", FetchSingleBook);

router.post("/add", AddNewBook);

export default router;