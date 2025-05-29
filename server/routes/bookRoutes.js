import express from "express";

import { AddNewBook, fetchAllBooks, FetchSingleBook, getTotalCount } from "../controllers/bookController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/", fetchAllBooks);

router.get("/totalbooks", getTotalCount);

router.get("/:id", FetchSingleBook);

router.post("/add", authUser, AddNewBook);

export default router;