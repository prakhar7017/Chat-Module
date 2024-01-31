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


// {
//     "ChatId":"f4e55946-97c5-42ff-94df-ed0e1d99d770",
//     "sender_id":"0868d0a1-e161-4900-9499-325cabaa78e1",
//     "receiver_id":"522eca3e-b365-4dee-91e7-65ceda8310f8",
//     "message": "heelo",
//     "updatedAt": "2024-01-29T16:01:02.699Z",
//     "createdAt": "2024-01-29T16:01:02.699Z"
// }