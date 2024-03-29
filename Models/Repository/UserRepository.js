import db from "../index.js";
import { Op } from "sequelize";

export const UserRepository = {
  async findUser(email) {
    try {
      // Find the user using the User model
      const user = await db.User.findOne({ where: { email } });

      // Return the found user object
      return user;
    } catch (error) {
      // Handle any errors that occur during the user search process
      console.error("Error finding user:", error);
      throw new Error("Failed to find user.");
    }
  },

  async createUser(username, email, password) {
    try {
      // Create the user using the User model
      const newUser = await db.User.create({ username, email, password });

      // Return the newly created user object
      return newUser;
    } catch (error) {
      // Handle any errors that occur during the user creation process
      console.error("Error creating user:", error);
      throw new Error("Failed to create user.");
    }
  },

  async findUserChats(userId) {
    try {
      // Find all chats where the provided userId is either the sender or the receiver
      const userChats = await db.User.findAll({
        where: {
          [Op.or]: [{ sender_id: userId }, { receiver_id: userId }],
        },
        include: [
          { model: db.User, as: "sender" },
          { model: db.User, as: "receiver" },
        ],
      });

      return userChats;
    } catch (error) {
      console.error("Error finding user chats:", error);
      throw new Error("Failed to find user chats");
    }
  },
  async findAllUsersExceptCurrentUser(userId) {
    try {
      // Find all users except the current user
      const users = await db.User.findAll({
        where: {
          userId: {
            [Op.ne]: userId, // Exclude the current user ID
          },
        },
      });

      return users;
    } catch (error) {
      console.error("Error finding users:", error);
      throw new Error("Failed to find users");
    }
  },
  async updateUserStatus(userId, status,lastSeen=null) {
    try {
      // Find the user by ID and update the status
      const user = await db.User.findByPk(userId, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });

      if (!user) {
        throw new Error("User not found");
      }

      user.status = status;
      if(lastSeen!=null && lastSeen!=undefined){
          user.lastSeen = lastSeen;
      }
      await user.save();

      return user;
    } catch (error) {
      console.error("Error updating user status:", error);
      throw new Error("Failed to update user status");
    }
  },
};
