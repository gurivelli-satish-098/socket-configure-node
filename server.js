require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { registerNameSpaces } = require("./name-spaces");
const userSocketMap = {};
const app = express();
const Database = require("./databases/sql-db");

const main = async () => {
  try {
    await Database.connect();
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        // methods: ["GET", "POST"],
      },
      pingInterval: 2 * 60 * 1000,
      pingTimeout: 5 * 60 * 1000,
    });

    // Handle WebSocket connection
    registerNameSpaces(io);
    return httpServer;
  } catch (error) {
    console.log(error);
  }
};

main()
  .then((httpServer) => {
    // Start the server on the specified port
    const port = process.env.PORT || 8000;
    httpServer.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  })
  .catch((error) => console.log(error));
