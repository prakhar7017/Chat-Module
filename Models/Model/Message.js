import { DataTypes } from "sequelize";
import {sequelize} from "../../Configs/db.js";

export const Message = sequelize.define("Message", {
  message_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  message_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sent_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  received_at: {
    type: DataTypes.DATE,
  },
  seen_at: {
    type: DataTypes.DATE,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
