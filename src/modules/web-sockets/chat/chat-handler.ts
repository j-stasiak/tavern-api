import { Server, Socket } from 'socket.io';
import { validatePayload } from '../util';
import { messageSchema } from './schemas';

// TODO: Add redis to hold chat history (could be used as Adapter for io later aswell)
// Add user info with middleware to socket.request.user - validate JWT
export const chatHandler = (io: Server, socket: Socket) => {
  const incomingMessage = (payload: any) => {
    validatePayload(messageSchema, payload);
    socket.broadcast.emit('message:client', payload);
  };

  socket.on('message', incomingMessage);
};
