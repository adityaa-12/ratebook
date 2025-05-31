import {
  addNewUser,
  isChangePassword,
  isExistUser,
  isLoginMail,
} from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function ForgotPassword(req, res, next) {
  try {
    let { email } = req.body;
    let isExist = await isExistUser(email);
    if (!isExist) {
      return res.json({
        message: "User Does not found!",
        isExistMail: 0,
      });
    }
    return res.json({
      message: "User Found!",
      isExistMail: 1,
    });
  } catch (error) {
    next(error);
  }
}

export async function isLogin(req, res, next) {
  try {
    let { email, password } = req.body || {};

    if (!email || !password) {
      
      return res.json({
        message: "Email and passwords are required!",
      });
    }

    const isExist = await isLoginMail(email);
    
    const user = isExist[0];

    if (isExist.length === 0 || !isExist) {
      return res.json({
        message: "User Does not exist!",
      });
    }

    const isMatchPass = await bcryptjs.compare(password, user.PASSWORD);

    if (!isMatchPass) {
      return res.json({
        message: "Invalid email or password!",
      });
    }

    const token = jwt.sign(
      { id: user.ID, email: user.EMAIL, role: user.ROLE },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });
    console.log(user.ROLE);
    

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user.ID,
        email: user.EMAIL,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function ChangePassword(req, res, next) {
  try {
    let { email, password } = req.body;
    let hashPassword = await bcryptjs.hash(password, 10);
    let change = await isChangePassword(email, hashPassword);

    let isExist = await isExistUser(email);

    if (!isExist) {
      return res.json({
        message: "User not found!",
      });
    }
    if (!change) {
      return res.json({
        message: "Failed to Change the Password!",
      });
    }

    return res.json({
      message: "Password has been changed",
    });
  } catch (error) {
    next();
  }
}

export async function AddUser(req, res, next) {
  try {
    let { username, email, password } = req.body;
    let hashPassword = await bcryptjs.hash(password, 10);
    let newUser = {
      username: username,
      email: email,
      password: hashPassword,
    };

    let isExist = await isExistUser(email);

    if (isExist) {
      return res.json({
        message: "Email has been used!",
      });
    }

    let storeUser = await addNewUser(newUser);

    if (!storeUser || storeUser.affectedRows === 0) {
      return res.json({
        message: "Failed to create your account",
      });
    }

    const insertId = storeUser.insertId;

    const token = jwt.sign(
      { id: insertId, email: email, role: storeUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    return res.json({
      message: "Account has been created!",
      token,
      user: {
        id: insertId,
        username: username,
        email: email,
      },
    });
  } catch (error) {
    next(error);
  }
}
