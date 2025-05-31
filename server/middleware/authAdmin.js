import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authAdmin(req, res, next) {
    const token = req.cookie?.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Session has been expired! | Please Re-Login.",
        });
    };

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        if (req.user.role == "ADMIN" && req.user) {
            next();
        } else {
            return res.status(403).json({
                message: "Access Denied!",
            });
        };
    } catch (error) {
        next(error);
    }
}