const Chat = require("./chat");

module.exports.registerNameSpaces = (socketIO) => {
  socketIO.on("connection", async (socket) => {
    console.log(`socket connected to ${socket.id}`);
    // const MasterFlowFacade = require("../facades/master-flow");
    // const masterFlowFacade = new MasterFlowFacade(socket);
    // masterFlowFacade.sentHeartbeatEvent();
  });

  socketIO.of("/chat").on("connection", async (socket) => {
    try {
      console.log(`chat socket connected to ${socket.id}`);
      const chat = new Chat(socketIO, socket);

      //handle events
      await chat.handleConnectionEvent();
      await chat.handleUserOnlineEvent();
      await chat.handleGetActiveRooms();
      await chat.handleDisconnectionEvent();
      await chat.handleSendMessageEvent();
    } catch (error) {
      console.error(`Error in chat namespace: ${error.message}`, error);
    }
  });
};
