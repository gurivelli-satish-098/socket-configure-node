module.exports.registerNameSpaces = (socketIO) => {
  socketIO.on("connection", async (socket) => {
    console.log(`socket connected to ${socket.id}`);
    const MasterFlowFacade = require("../facades/master-flow");
    const masterFlowFacade = new MasterFlowFacade(socket);
    // masterFlowFacade.sentHeartbeatEvent();
  });

  socketIO.of("/chat").on("connection", async (socket) => {
    console.log(`chat socket connected to ${socket.id}`);
  });
};
