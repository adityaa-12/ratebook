import express from "express";
import { createAccount, genOTP, verOTP } from "../controllers/userControl.js";

const router = express.Router();

router.post("/create", createAccount);

router.get("/gen-otp", genOTP);

router.get("/confirm-otp", verOTP);

export default router;
