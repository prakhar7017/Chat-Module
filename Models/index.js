import { sequelize } from "../Configs/db.js";
import { User } from "./Model/User.js";
import { Chat } from "./Model/Chat.js";
// import {defineAssociations} from  "./Associations.js"
// defineAssociations();

// User.hasMany(Message, { foreignKey: "sender_id" });
// Message.belongsTo(User, { foreignKey: "sender_id" });

// Chat.belongsToMany(User, { through: ChatMember, foreignKey: "chat_id" });
// User.belongsToMany(Chat, { through: ChatMember, foreignKey: "user_id" });

// Chat.hasMany(Message, { foreignKey: "chat_id" });
// Message.belongsTo(Chat, { foreignKey: "chat_id" });
Chat.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' }); // A Chat belongs to a User as a sender
Chat.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' }); // A Chat belongs to a User as a receiver


await sequelize.sync({ force: false });

const db = {
    User,
    Chat,
};
export default db ;