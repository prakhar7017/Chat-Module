import db from "../index.js"
import { Op } from 'sequelize';

export const ChatRepositroy = {
    async getLastMessage(chatId, userId){
        try {
            const lastMessage = await db.Message.findOne({
                where: {
                    chatId: chatId,
                    senderId: { [sequelize.Op.ne]: userId },
                },
                order: [["createdAt", "DESC"]],
            });
    
            return lastMessage;
        } catch (error) {
            console.error("Error fetching last message:", error.message);
            throw error;
        }
    },
    async updateMessageSeenAt(messageId){
        try {
            await db.Message.update(
                { seen_at: new Date() },
                { where: { message_id: messageId } }
            );
        } catch (error) {
            console.error("Error updating message seen_at:", error.message);
            throw error;
        }
    },
    async findChatsByUserId (userId) {
        try {
            const chats = await db.Chat.findAll({
                include: [
                    {
                        model: db.ChatMember,
                        where: { user_id: userId }
                    },
                    {
                        model: db.Message,
                        where: { sender_id: userId },
                        required: false // To include chats where the user has sent messages
                    }
                ]
            });
            return chats;
        } catch (error) {
            console.error("Error finding chats by user ID:", error.message);
            throw error;
        }
    },
    async updateMessagesStatus ({ chatIds, userId, status }){
        try {
            await db.Message.update(
                { received_at:new Date() },
                {
                    where: {
                        chat_id: { [sequelize.Op.in]: chatIds },
                        sender_id: { [sequelize.Op.ne]: userId },
                    },
                }
            );
        } catch (error) {
            console.error("Error updating messages status:", error.message);
            throw error;
        }
    },
    async createNewChat(){
        try {
            const newChat = await db.Chat.create();
            return newChat;
        } catch (error) {
            console.error("Error creating chat:", error.message);
            throw error;
        }
    },
    async bulkCreateChatMembers ({ senderId, receiverId, chatId }){
        try {
            const chatMembers = [
                { user_id: senderId, chat_id: chatId },
                { user_id: receiverId, chat_id: chatId }
            ];
    
            await db.ChatMember.bulkCreate(chatMembers);
        } catch (error) {
            console.error("Error bulk creating chat members:", error.message);
            throw error;
        }
    },
}