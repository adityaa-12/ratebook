import express from "express";
import { createAccount, genOTP, loginUser, verOTP } from "../controllers/userControl.js";

const router = express.Router();

router.post("/create", createAccount);

router.get("/gen-otp", genOTP);

router.get("/confirm-otp", verOTP);

router.get("/login", loginUser);

export default router;
