import express from "express";
import { AddUser, ChangePassword, ForgotPassword, isLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", AddUser);

router.get("/forgot", ForgotPassword);

router.put("/changepassword", ChangePassword);

router.get("/login", isLogin);

export default router;