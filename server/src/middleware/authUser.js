import jwt from "jsonwebtoken";

export const confirmUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      message: "Unauthorized",
    });

  try {
    const confirm = jwt.verify(token, process.env.JWT_SECRET);
    req.user = confirm;
    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
