class MasterFlowFacade {
  constructor(socket) {
    this.socket = socket || null;
  }

  sentHeartbeatEvent = async () => {
    setInterval(() => {
      console.log("heart-event");
      this.socket.emit("heart", { active: true });
    }, 2 * 1000);
  };
}

module.exports = MasterFlowFacade;
