import express from "express";

import { addNewRev, getRevForBook, getRevForUser } from "../controllers/reviewController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.get("/users/:id", authUser, getRevForUser);

router.get("/book/:id", getRevForBook);

router.post("/add", authUser,  addNewRev);


export default router;