import { UserRepository } from "./Models/Repository/UserRepository.js";
import { ChatRepository } from "./Models/Repository/ChatRepository.js";
// import {ValidateSign} from "./utils/common.js"
// import {updateMessageStatus} from "./Controllers/Chat/ChatController.js";
// let activeUsers = [];


function initializeChatModule(io) {


  io.on("connection", (socket) => {
    console.log("New user connected");

    //online
    socket.on("online",async (data)=>{
      const {userId}=data;
      const newStatus=await UserRepository.updateUserStatus(userId,"online");

      socket.broadcast.emit("updateUserStatus",newStatus);
    })

    //offline
    socket.on("offline",async (data)=>{
      const {userId}=data;
      const newStatus=await UserRepository.updateUserStatus(userId,"offline");
      socket.broadcast.emit("updateUserStatus",newStatus);
    })

    // chatting implmenttation
    // pass response of new chat req
    socket.on("newChat", async (data) => {
      socket.broadcast.emit("loadNewChat", data);
    });

    // existing chat
    socket.on("existingChat", async (data) => {
      const {sender_id,receiver_id}=data;
      const chats=await ChatRepository.findExistingChats(sender_id,receiver_id);
      socket.emit("loadExistingChat",{chats:chats});
    })

    // pass reponse of delete req
    // chat deleted
    socket.on("chatDeleted", async (data) => {
      const {chatId}=data;
      // const deletedChat=await ChatRepository.deleteChat(chatId);
      socket.broadcast.emit("chatMessageDeleted",chatId);
    })
    
    // update chat
    // pass response of update req
    socket.on("chatUpdated", async (data) => {
      socket.broadcast.emit("chatMessageUpdated",data);
    })

    // disconnect
    socket.on("dissconnect", async (data) => {
      console.log("User Disconnected");
      const {userId}=data;
      const newStatus=await User.updateUserStatus(userId,"offline");
      socket.broadcast.emit("updateUserStatus",newStatus);
    })


  });
}

export default initializeChatModule;


// socket.on("message-seen-status", (data) => {
//   // console.log("-------SEEN-------")
//   data.status = "seen";
//   updateMessageStatus({
//     chatId: data.chatId,
//     userId: data.userId,
//     status: data.status,
//   });
//   // console.log("Message seen by: ", data)
//   io.emit("message-seen", data);
// });

// socket.on("new-user-add", (newUserId) => {
//   // Check if the user is not already in activeUsers
//   console.log("hitted");
//   if (!activeUsers.some((user) => user.userId === newUserId)) {
//     // Add the new user to activeUsers
//     activeUsers.push({ userId: newUserId, socketId: socket.id });
//     console.log(activeUsers)
//     // Update message status for the new user
//     updateMessageStatus({
//       userId: newUserId,
//       status: "delivered",
//     });
//   }

//   // Emit the list of active users to all clients
//   io.emit("get-users", activeUsers);
// });

// socket.on("disconnect", () => {
//   // remove user from active users
//   activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//   console.log("User Disconnected", activeUsers);
//   // send all active users to all users
//   io.emit("get-users", activeUsers);
// });

// socket.on("offline", () => {
//   // remove user from active users
//   activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//   console.log("User Disconnected", activeUsers);
//   // send all active users to all users
//   io.emit("get-users", activeUsers);
// });

// // typing status
// socket.on("typing", (data) => {
//   const user = activeUsers.find((user) => user.userId === data.receiverId);
//   if (user) {
//     io.to(user.socketId).emit("get-typing", data);
//     // console.log("typing: " + data)
//   }
// });

// // send message to a specific user
// socket.on("send-message", (data) => {
//   const { receiverId } = data;
//   const user = activeUsers.find((user) => user.userId === receiverId);
//   // console.log("Sending from socket to :", receiverId)
//   data.status = "sent";
//   // console.log("Data: ", data)
//   if (user) {
//     io.to(user.socketId).emit("recieve-message", data);
//   }

//   // console.log("--------------------");
// });

