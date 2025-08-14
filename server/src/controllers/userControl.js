import users from "../models/userModel.js";
import { sendMail } from "../utils/emailService.js";
import { generateOTP } from "../utils/otpGenerate.js";
import { storeOTP, verifyOTP } from "../utils/otpStore.js";
import jwt from "jsonwebtoken";

// Create Account

export const createAccount = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let userBody = req.body;

    let email = req.body.email;

    let isExistEmail = await users.findOne({
      email: email,
    });

    if (isExistEmail) {
      return res.status(400).json({
        message: "Email already exist!",
      });
    }

    let userCreate = await users.create(userBody);

    if (!userCreate) {
      return res.status(400).json({
        message: "Failed to create account!",
      });
    }

    return res.status(200).json({
      message: "Account Created!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Generate OTP

export const genOTP = async (req, res) => {
  try {
    let userBody = req.body;

    if (!userBody) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    const otp = generateOTP();
    storeOTP(userBody.email, otp);

    let subject = "Your Ratebook OTP Verfication Code";
    let htmltemp = `<!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2c3e50;">Ratebook Verification Code</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (OTP) for <strong>Ratebook</strong> account verification is:</p>
        <h1 style="background: #f4f4f4; display: inline-block; padding: 10px 20px; border-radius: 5px; color: #2c3e50;">${otp}</h1>
        <p>This code will expire in <strong>5 minutes</strong>. Please do not share it with anyone.</p>
        <p>If you didn’t request this code, you can safely ignore this email.</p>
        <br>
        <p>Best regards,<br>
        <strong>Ratebook Support Team</strong></p>
      </body>
      </html>`;

    let msg = await sendMail(userBody.email, subject, htmltemp);
    console.log(`OTP sent to ${userBody.email}`);

    if (!msg) {
      return res.status(400).json({
        message: "Failed to send OTP",
      });
    }

    return res.status(200).json({
      message: "OTP has been sent to your email!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Confirm OTP

export const authOTP = async (req, res) => {
  try {
    let userBody = req.body;

    if (!userBody) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let checkOTP = verifyOTP(userBody.email, userBody.otp);
    console.log(checkOTP);

    if (!checkOTP) {
      return res.status(400).json({
        message: "OTP has been expired | Invalid OTP",
      });
    }

    return res.status(200).json({
      message: "OTP has been Verified",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    let userBody = req.body;

    if (!userBody) {
      return res.status(200).json({
        message: "Data Required!",
      });
    }

    let userMail = userBody.email;
    let userPass = userBody.password;

    let findUser = await users.findOne({ email: userMail });
    console.log(findUser);

    if (findUser == 0) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    console.log(userBody);

    if (findUser.password === userPass) {
      const token = jwt.sign(
        { id: findUser.id, email: userBody.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "You're Login Successfully",
      });
    }

    return res.status(400).json({
      message: "Invalid Email and Password!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Change Password

export const changePass = async (req, res) => {
  try {
    let userBody = req.body;

    let email = userBody.email;
    let password = userBody.password;

    if (!userBody) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let Change = await users.findOneAndUpdate(
      { email },
      { $set: { password: password } }
    );

    if (Change) {
      return res.status(200).json({
        message: "Updated Successfully",
      });
    }

    return res.status(400).json({
      message: "Failed to Change Password!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// Update User Details

export const updateUser = async (req, res) => {
  try {
    let userBody = req.body;

    const { email, ...updatedData } = userBody;

    if (!userBody) {
      return res.status(400).json({
        message: "Data Required!",
      });
    }

    let Change = await users.findOneAndUpdate({ email }, { $set: updatedData });

    if (Change) {
      return res.status(200).json({
        message: "Updated Successfully",
      });
    }

    return res.status(400).json({
      message: "Failed to Update!",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
