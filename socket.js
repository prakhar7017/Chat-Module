import { User } from "./Models/Repository/UserRepository.js";
import {updateMessageStatus} from "./Controllers/Chat/ChatController.js";
let activeUsers = [];


function initializeChatModule(io) {
  io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("new-user-add", (newUserId) => {
      // Check if the user is not already in activeUsers
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        // Add the new user to activeUsers
        activeUsers.push({ userId: newUserId, socketId: socket.id });

        // Update message status for the new user
        updateMessageStatus({
          userId: newUserId,
          status: "delivered",
        });
      }

      // Emit the list of active users to all clients
      io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    socket.on("offline", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    // typing status
    socket.on("typing", (data) => {
      const user = activeUsers.find((user) => user.userId === data.receiverId);
      if (user) {
        io.to(user.socketId).emit("get-typing", data);
        // console.log("typing: " + data)
      }
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      // console.log("Sending from socket to :", receiverId)
      data.status = "sent";
      // console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }

      // console.log("--------------------");
    });

    socket.on("message-seen-status", (data) => {
      // console.log("-------SEEN-------")
      data.status = "seen";
      updateMessageStatus({
        chatId: data.chatId,
        userId: data.userId,
        status: data.status,
      });
      // console.log("Message seen by: ", data)
      io.emit("message-seen", data);
    });
  });
}

export default initializeChatModule;
