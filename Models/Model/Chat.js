import { DataTypes } from "sequelize";
import {sequelize} from "../../Configs/db.js";

export const Chat = sequelize.define("Chat", {
  chat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chat_type: {
    type: DataTypes.ENUM("One-to-One", "Group"),
    allowNull: false,
  },
  chat_name: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
