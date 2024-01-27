export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Create a new chat
    const newChat = await ChatRepositroy.createNewChat();

    // Add members to the chat
    await ChatRepositroy.bulkCreateChatMembers({senderId,receiverId,chatId:newChat.chat_id})

    res.status(200).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error.message);
    res.status(500).json({ error: "Failed to create chat" });
  }
};
export const updateMessageStatus = async ({ chatId, userId, status }) => {
  try {
    if (status === "seen") {
      const lastMessage = await ChatRepositroy.getLastMessage(chatId, userId);

      if (lastMessage) {
        await ChatRepositroy.updateMessageSeenAt(lastMessage.message_id);
      }
    } else if (status === "delivered") {
      const chats = await ChatRepositroy.findChatsByUserId(userId);

      const chatIds = chats.map((chat) => chat.chat_id);

      await ChatRepositroy.updateMessagesStatus({
        chatIds,
        userId,
        status,
      });
    }
  } catch (error) {
    console.error("Error updating message status:", error.message);
  }
};
