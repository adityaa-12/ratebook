// Express App

import express from "express";
import cors from "cors";
import morgan from "morgan";
import db from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

export default async function startApp() {
  const app = express();

  // Middlewares

  app.use(express.json());
  app.use(cors({
    origin: "*",
    credentials: true,
  }));
  app.use(morgan("short"));
  app.use(cookieParser());

  // Main routes

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.use("/books", bookRoutes);
  app.use("/review", reviewRoutes);
  app.use("/user", userRoutes);

  // To check the db is active

  try {
    await db.query("SELECT 1");
    console.log("Database connection is active!");
  } catch (error) {
    console.log("Database connection is failed", error.message);
  }

  return app;
}
