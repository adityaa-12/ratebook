import express from "express";
import { createReview, deleteReview, getRevApp, updateRev } from "../controllers/reviewControl.js";

const router = express.Router();

router.post("/add", createReview);

router.get("/get/:id", getRevApp);

router.put("/update/:id", updateRev);

router.delete("/delete/:id", deleteReview);


export default router;