import type { Server } from 'http';
import { Server as SocketIoServer, Socket } from 'socket.io';
import { chatHandler } from './modules/web-sockets/chat';

export const initSocketServer = (server: Server): SocketIoServer => {
  const io = new SocketIoServer(server);
  const onConnection = (socket: Socket) => {
    chatHandler(io, socket);
  };
  io.on('connection', onConnection);

  return io;
};
