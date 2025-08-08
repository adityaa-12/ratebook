// Set up for Express App

import express from "express";
import cors from "cors";
import morgan from "morgan";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Routes

app.get("/", (req, res) => {
    res.send("This is Home Route");
});

// Book Routes

app.use("/book", bookRoutes);

// Error Handler

export default app;
