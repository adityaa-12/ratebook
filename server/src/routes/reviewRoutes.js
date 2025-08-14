import express from "express";
import { createReview } from "../controllers/reviewControl.js";

const router = express.Router();

router.post("/add", createReview);


export default router;