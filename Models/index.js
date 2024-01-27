import { sequelize } from "../Configs/db.js";
import { User } from "./Model/User.js";
import { Chat } from "./Model/Chat.js";
import { Message } from "./Model/Message.js";
import { ChatMember } from "./Model/ChatMember.js";
// import {defineAssociations} from  "./Associations.js"
// defineAssociations();

User.hasMany(Message, { foreignKey: "sender_id" });
Message.belongsTo(User, { foreignKey: "sender_id" });

Chat.belongsToMany(User, { through: ChatMember, foreignKey: "chat_id" });
User.belongsToMany(Chat, { through: ChatMember, foreignKey: "user_id" });

Chat.hasMany(Message, { foreignKey: "chat_id" });
Message.belongsTo(Chat, { foreignKey: "chat_id" });


await sequelize.sync({ force: false });

const db = {
    User,
    Chat,
    Message,
    ChatMember
};
export default db ;