import db from "../index.js"
import { Op } from 'sequelize';

export const ChatRepository = {
    async updateMessagesStatus (chatId,status ){
        try {
            const chat=await db.Chat.update({
                status: status
            }, {
                where: {
                    ChatId: chatId,
                }
            })
            const updatedChat=await db.Chat.findByPk(chatId);
            return updatedChat;
        } catch (error) {
            console.error("Error updating messages status:", error.message);
            throw error;
        }
    },
    async createNewChat(sender_id,receiver_id,message,status="sent"){
        try {
            const newChat = await db.Chat.create({
                sender_id:sender_id,
                receiver_id:receiver_id,
                message:message,
                status:status
            });
            return newChat;
        } catch (error) {
            console.error("Error creating chat:", error.message);
            throw error;
        }
    },
    async findExistingChats(sender_id, receiver_id) {
        try {
            const existingChats = await db.Chat.findAll({
                where: {
                    [Op.or]: [
                        { sender_id: sender_id, receiver_id: receiver_id },
                        { sender_id: receiver_id, receiver_id: sender_id }
                    ]
                }
            });
            
            return existingChats;
        } catch (error) {
            console.error("Error finding existing chats:", error);
            throw new Error("Failed to find existing chats");
        }
    },
    async deleteChatBySenderId(chatId, senderId){
        try {
            // Find the chat message by chatId and senderId and delete it
            const deletedChat = await db.Chat.destroy({
                where: {
                    ChatId: chatId,
                    sender_id: senderId
                }
            });
    
            return deletedChat;
        } catch (error) {
            console.error("Error deleting chat:", error);
            throw new Error("Failed to delete chat");
        }
    },

    async updateTheChat(chatId, senderId, message){
        try {
            // Find the chat message by chatId and senderId and update it
            const updatedChat = await db.Chat.update(
                { message: message },
                {
                    where: {
                        ChatId: chatId,
                        sender_id: senderId
                    }
                }
            );

            const newUpdatedChat = await db.Chat.findOne({
                where: {
                    ChatId: chatId,
                    sender_id: senderId
                }
            });
    
            return newUpdatedChat;
        } catch (error) {
            console.error("Error updating chat:", error);
            throw new Error("Failed to update chat");
        }
    }
}