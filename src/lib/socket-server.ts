import { Server } from 'socket.io';
import { createServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: { origin: '*' },
});

const onlineUsers = new Map<string, string>(); // userId -> socketId

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('register', (userId: string) => {
    onlineUsers.set(userId, socket.id);
    socket.join(`user:${userId}`);
  });

  socket.on('join_conversation', (conversationId: string) => {
    socket.join(`conv:${conversationId}`);
  });

  socket.on('send_message', (data: { conversationId: string; senderId: string; content: string }) => {
    io.to(`conv:${data.conversationId}`).emit('new_message', data);
    // Notify other participants
    socket.to(`conv:${data.conversationId}`).emit('message_received', data);
  });

  socket.on('typing', (data: { conversationId: string; userId: string }) => {
    socket.to(`conv:${data.conversationId}`).emit('user_typing', data);
  });

  socket.on('stop_typing', (data: { conversationId: string; userId: string }) => {
    socket.to(`conv:${data.conversationId}`).emit('user_stop_typing', data);
  });

  socket.on('disconnect', () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

const PORT = parseInt(process.env.SOCKET_PORT || '3001');
httpServer.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
