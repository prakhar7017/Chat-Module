import db from "../index.js"
import { Op } from 'sequelize';

export const User = {
    async findUser(username) {
        try {
            // Find the user using the User model
            const user = await db.User.findOne({ where: { username } });
            
            // Return the found user object
            return user;
        } catch (error) {
            // Handle any errors that occur during the user search process
            console.error('Error finding user:', error);
            throw new Error('Failed to find user.');
        }
    },

    async createUser(username, password) {
        try {
            // Create the user using the User model
            const newUser = await db.User.create({ username, password });
            
            // Return the newly created user object
            return newUser;
        } catch (error) {
            // Handle any errors that occur during the user creation process
            console.error('Error creating user:', error);
            throw new Error('Failed to create user.');
        }
    },

    async findUserChats(userId){
        try {
            // Find all chats except the ones where the provided userId is a member
            const userChats = await db.Chat.findAll({
                include: [{
                    model: db.ChatMember,
                    where: {
                        user_id: { [Op.ne]: userId }
                    }
                }]
            });
    
            return userChats;
        } catch (error) {
            console.error('Error finding user chats:', error);
            throw new Error('Failed to find user chats');
        }
    },
    async updateUserStatus(userId, status) {
        try {
            const updatedStatus=await db.User.update({ status }, { where: { user_id: userId } });
            return updatedStatus;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw new Error('Failed to update user status');
        }
    }
};
