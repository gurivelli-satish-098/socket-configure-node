"use strict";
const { Model, NOW } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      parentId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "parent_id",
      },
      groupId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "group_id",
      },
      mediaType: {
        allowNull: false,
        type: DataTypes.ENUM(["text", "image", "gif", "audio", "video"]),
        defaultValue: "text",
        field: "media_type",
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      sendTime: {
        allowNull: false,
        field: "created_at",
        type: DataTypes.DATE,
      },
      //   active: {
      //     allowNull: false,
      //     type: DataTypes.BOOLEAN,
      //     defaultValue: 1,
      //   },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "chat_chats",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Chat;
};
