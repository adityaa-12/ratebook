import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authUser(req, res, next) {
  const token = req.cookie?.token;

  if (!token) {
    return res.status(401).json({
      message: "Session has been expired | Please Re-Login",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status({
      message: "Invalid or Expired Session, Please Re-Login",
    });
  }
}
