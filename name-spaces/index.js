module.exports.registerNameSpaces = (socketIO) => {
  socketIO.on("connection", async (socket) => {
    console.log(`socket connected to ${socket.id}`);
  });

  socketIO.of("/chat").on("connection", async (socket) => {
    console.log(`chat socket connected to ${socket.id}`);
  });
};
