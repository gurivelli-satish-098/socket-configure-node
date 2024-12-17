"use strict";
const { Model, NOW } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      profilePic: {
        allowNull: true,
        type: DataTypes.STRING(256),
        field: "profile_pic",
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      lastMessageSent: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: NOW,
        field: "last_message_sent",
      },
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "chat_groups",
      timestamps: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Group;
};
