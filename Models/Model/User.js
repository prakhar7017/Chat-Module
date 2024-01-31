import { DataTypes } from "sequelize";
import { sequelize } from "../../Configs/db.js";

export const User = sequelize.define("User", {
  // Define fields and their data types
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures email is unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "offline",
  },
  lastSeen: {
    type: DataTypes.DATE,
  },
});
