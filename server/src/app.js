// Set up for Express App

import express from "express";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const app = express();

// Rate Limiter

const expRate = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// Middleware

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("combined"));
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(expRate);
app.disable("X-powered-by");

// Routes

app.get("/", (req, res) => {
  res.send("This is Home Route");
});

// App Routes

app.use("/book", bookRoutes);

app.use("/user", userRoutes);

app.use("/review", reviewRoutes);

// Error Handler

export default app;
