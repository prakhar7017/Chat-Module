import { ChatRepository } from "../../Models/Repository/ChatRepository.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId, message } = req.body;

  try {
    // Create a new chat
    const newChat = await ChatRepository.createNewChat(
      senderId,
      receiverId,
      message
    );

    res.status(200).json({
      success: true,
      message: "Chat created successfully",
      data: newChat,
    });
  } catch (error) {
    console.error("Error creating chat:", error.message);
    res.status(500).json({
      success: false,
      errorMessage: "Failed to create chat",
      error: error,
    });
  }
};

export const updateChat = async (req, res) => {
  const { chatId,senderId,message } = req.body;

  try {
    // Find the chat message by chatId and update it
    const updatedChat = await ChatRepository.updateTheChat(chatId,senderId,message);

    if (!updatedChat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Chat updated successfully",
      data: updatedChat,
    });
  } catch (error) {
    console.error("Error updating chat:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}


export const deleteOwnChats = async (req, res) => {
  const { id } = req.user; 
  const { chatIds } = req.body; 

  try {
      const deletedChats =await ChatRepository.deleteOwnChats(chatIds, id);

      if (deletedChats === 0) {
          return res.status(404).json({
              success: false,
              message: "No chats found to delete",
          });
      }

      return res.status(200).json({
          success: true,
          message: "Chats deleted successfully",
      });
  } catch (error) {
      console.error("Error deleting chats:", error);
      return res.status(500).json({
          success: false,
          message: "Something went wrong",
      });
  }
};
