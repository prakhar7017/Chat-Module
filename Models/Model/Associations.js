import { User } from "../User";
import { Chat } from "../Chat";
import { Message } from "../Message";
import { ChatMember } from "../ChatMember";

export const defineAssociations=()=>{
  // Define associations
  User.hasMany(Message, { foreignKey: "sender_id" });
  Message.belongsTo(User, { foreignKey: "sender_id" });

  Chat.belongsToMany(User, { through: ChatMember, foreignKey: "chat_id" });
  User.belongsToMany(Chat, { through: ChatMember, foreignKey: "user_id" });

  Chat.hasMany(Message, { foreignKey: "chat_id" });
  Message.belongsTo(Chat, { foreignKey: "chat_id" });
}
