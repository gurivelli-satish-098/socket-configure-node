require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { registerNameSpaces } = require("./name-spaces");
const userSocketMap = {};
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Serve a simple GET endpoint for testing purposes
app.get("/", (req, res) => {
  res.send("<h1>Hello, Socket.IO</h1>");
});

// Handle WebSocket connection
registerNameSpaces(io);

// Start the server on the specified port
const port = process.env.PORT || 8000;
httpServer.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
