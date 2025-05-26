import express from "express";

import { addNewRev, getRevForBook, getRevForUser } from "../controllers/reviewController.js";

const router = express.Router();

router.get("/users/:id", getRevForUser);

router.get("/book/:id", getRevForBook);

router.post("/add", addNewRev);


export default router;