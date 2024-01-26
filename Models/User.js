import { DataTypes } from 'sequelize';
import  sequelize from '../Configs/db.js'

export const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Online', 'Offline'),
    defaultValue: 'Offline'
  },
  last_seen: {
    type: DataTypes.DATE
  }
});

