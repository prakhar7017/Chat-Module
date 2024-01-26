import { DataTypes } from 'sequelize';
import  sequelize from '../Configs/db.js'

export const ChatMember = sequelize.define('ChatMember', {
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});
