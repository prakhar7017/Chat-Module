import { UserRepository } from "./Models/Repository/UserRepository.js";
import { ChatRepository } from "./Models/Repository/ChatRepository.js";

function initializeChatModule(io) {
  io.on("connection", (socket) => {
    console.log("New user connected");

    //online
    socket.on("online", async (data) => {
      const { userId } = data;
      const newStatus = await UserRepository.updateUserStatus(userId, "online");

      socket.broadcast.emit("updateUserStatus", newStatus);
    });

    //offline
    socket.on("offline", async (data) => {
      const { userId } = data;
      const lastSeen = new Date();
      const newStatus = await UserRepository.updateUserStatus(
        userId,
        "offline",
        lastSeen
      );
      socket.broadcast.emit("updateUserStatus", newStatus);
    });

    // typing status
    // add eventlistener for typing on input tag
    socket.on("typing", (data) => {
      const { userId } = data;
      socket.broadcast.emit("userTyping", { userId: userId });
    });

    // chatting implmenttation
    // pass response of new chat req
    // socket.on("newChat", async (data) => {
    //   socket.broadcast.emit("loadNewChat", data);
    // });


    // New message sent
    // on eventlistener for send message
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, message } = data;

      const sentMessage = await ChatRepository.createNewChat(
        senderId,
        receiverId,
        message,
        "sent"
      );

      // Emit the message to the sender
      socket.emit("messageSent", sentMessage);

      // Broadcast the message to the receiver
      socket.to(receiverId).emit("messageReceived", sentMessage);
    });

    // message seen status
    socket.on("messageSeen", async (data) => {
      const { chatId } = data;

      const updatedMessage = await ChatRepository.updateMessagesStatus(chatId, "seen");

      socket.broadcast.emit("messageSeenByRecipient", updatedMessage);
    });

    // existing chat
    socket.on("existingChat", async (data) => {
      const { sender_id, receiver_id } = data;
      const chats = await ChatRepository.findExistingChats(
        sender_id,
        receiver_id
      );
      socket.emit("loadExistingChat", { chats: chats });
    });

    // pass reponse of delete req
    // chat deleted
    socket.on("chatDeleted", async (data) => {
      const { chatId } = data;
      // const deletedChat=await ChatRepository.deleteChat(chatId);
      socket.broadcast.emit("chatMessageDeleted", chatId);
    });

    // update chat
    // pass response of update req
    socket.on("chatUpdated", async (data) => {
      socket.broadcast.emit("chatMessageUpdated", data);
    });

    // disconnect
    socket.on("dissconnect", async (data) => {
      console.log("User Disconnected");
      const { userId } = data;
      const lastSeen = new Date();
      const newStatus = await UserRepository.updateUserStatus(
        userId,
        "offline",
        lastSeen
      );
      socket.broadcast.emit("updateUserStatus", newStatus);
    });
  });
}

export default initializeChatModule;