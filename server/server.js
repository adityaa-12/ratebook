// Server

import http from "http";
import dotenv from "dotenv";
import startApp from "./app.js";

// Setup

dotenv.config();

const PORT = process.env.SERVER_PORT;
const app = await startApp();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log("Server is Running!");
});