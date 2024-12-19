const SqlDatabase = require("../databases/sql-db");
module.exports = class GroupService {
  constructor() {
    this.db = SqlDatabase.db;
  }

  fetchGroupsByUserId = async (userId) => {
    try {
      if (!userId) {
        throw new Error("userId is required");
      }
      const filter = {
        userId,
        active: 1,
      };
      return await this.db.GroupUserMap.findAll({
        where: filter,
        attributes: ["groupId"],
      });
    } catch (error) {
      console.error(
        `Error in GroupService.fetchGroupsByUserId: ${error.message}`,
        error
      );
      return [];
    }
  };
};
