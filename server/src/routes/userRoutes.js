import express from "express";
import { createAccount } from "../controllers/userControl.js";

const router = express.Router();

router.post("/create", createAccount);


export default router;