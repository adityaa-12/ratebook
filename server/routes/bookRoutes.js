import express from "express";

import { AddNewBook, fetchAllBooks, FetchSingleBook, getTotalCount } from "../controllers/bookController.js";
import { authUser } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", fetchAllBooks);

router.get("/totalbooks", getTotalCount);

router.post("/add", authUser, authAdmin,  AddNewBook);

router.get("/:id", FetchSingleBook);

export default router;

