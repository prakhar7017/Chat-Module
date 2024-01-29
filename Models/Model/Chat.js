import { DataTypes } from "sequelize";
import { sequelize } from "../../Configs/db.js";

export const Chat = sequelize.define("Chat", {
  ChatId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  receiver_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});
