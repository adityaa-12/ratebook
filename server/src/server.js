// Server Start + DB Connection 

import dotenv from "dotenv";
import app from "./app.js";
import database from "./config/database.js";

dotenv.config();
const PORT = process.env.PORT;

// Connection to MongoDB

app.listen(PORT, () => {
    database();
    console.log("Server is Running!");
});