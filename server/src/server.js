// Server Start + DB Connection 

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config({
    override: true
});
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connection to MongoDB

let conn = mongoose.connect(MONGO_URI)
.then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
        console.log("Server is Running");
    });
}) 
.catch((err) => {
    console.error("Failed to Connect!", err.message);
    process.exit(1);
});