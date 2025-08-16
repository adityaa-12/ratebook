import express from "express";
import {
  authOTP,
  changePass,
  createAccount,
  genOTP,
  getAllData,
  loginUser,
  updateUser,
} from "../controllers/userControl.js";

const router = express.Router();

router.post("/create", createAccount);

router.get("/gen-otp", genOTP);

router.get("/confirm-otp", authOTP);

router.get("/login", loginUser);

router.post("/change", changePass);

router.post("/update", updateUser);

router.get("/get/:id", getAllData);

export default router;
