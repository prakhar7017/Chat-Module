function initializeChatModule(io) {
  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
}

export default initializeChatModule;
