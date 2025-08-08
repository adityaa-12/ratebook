import express from "express";
import { bookCreate } from "../controllers/bookControl.js";

const router = express.Router();

router.post("/", bookCreate);

export default router;