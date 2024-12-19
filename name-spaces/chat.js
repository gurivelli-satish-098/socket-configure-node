const { CHAT_EVENTS } = require("../constants/events");
const moment = require("moment");
const GroupService = require("../services/groups");

module.exports = class Chat {
  constructor(io, socket) {
    this.io = io;
    this.socket = socket;
    this.groupService = new GroupService();
  }

  handleConnectionEvent = async () => {
    try {
      const data = {
        socketId: this.socket.id,
        startsAt: moment.utc().toISOString(),
        transport: this.socket.conn?.transport?.name,
        namespace: this.socket.nsp.name,
      };
      console.log(data);
    } catch (error) {
      console.error(
        `Error in Chat.handleConnectionEvent: ${error.message}`,
        error
      );
    }
  };

  handleUserOnlineEvent = async () => {
    try {
      this.socket.on(CHAT_EVENTS.USER_ONLINE, async (data) => {
        const { userId } = data;
        const groups = await this.groupService.fetchGroupsByUserId(userId);
        for (const group of groups) {
          console.log(
            `${this.socket.id} is joining group - group:${group.groupId}`
          );
          this.socket.join(`group:${group.groupId}`);
        }
      });
    } catch (error) {
      console.error(`Error in Chat.joinRoom: ${error.message}`, error);
    }
  };

  handleDisconnectionEvent = async () => {
    try {
      this.socket.on(CHAT_EVENTS.DISCONNECT, async () => {
        console.log(`${this.socket.id} is disconnected!`);
      });
    } catch (error) {
      console.error(
        `Error in Chat.handleDisconnectionEvent: ${error.message}`,
        error
      );
    }
  };

  handleGetActiveRooms = async () => {
    this.socket.on(CHAT_EVENTS.GET_ROOMS, async () => {
      try {
        const namespace = this.io.of("/chat");
        const rooms = namespace.adapter.rooms;
        console.log(`on chat space rooms`, rooms);
        console.log(`whole socket rooms`, this.socket.adapter.rooms);
        console.log("rooms where user in", this.socket.rooms);
        this.socket.emit(CHAT_EVENTS.GET_ROOMS, {});
      } catch (error) {
        console.log(
          `Error in Chat.handleGetActiveRooms: ${error.message}`,
          error
        );
      }
    });
  };

  handleSendMessageEvent = async () => {
    try {
      this.socket.on(CHAT_EVENTS.SEND_MESSAGE, async (data) => {
        const { groupId, message } = data;
        console.log(
          `message received from ${this.socket.id} in group:${groupId}`
        );
        this.socket.to(`group:${groupId}`).emit(CHAT_EVENTS.RECEIVE_MESSAGE, {
          groupId,
          message,
          from: this.socket.id,
        });
      });
    } catch (error) {
      console.log(
        `Error in Chat.handleSendMessageEvent: ${error.message}`,
        error
      );
    }
  };
};
