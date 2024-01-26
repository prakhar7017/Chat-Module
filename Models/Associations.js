import db from 

User.hasMany(ChatMember);
Chat.hasMany(ChatMember);
Chat.hasMany(Message);
User.hasMany(Message);

module.exports = {
  User,
  Chat,
  Message,
  ChatMember
};
