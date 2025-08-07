// Set up for Express App

import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Routes

app.get("/", (req, res) => {
    res.send("This is Home Route");
})

// Error Handler

export default app;
