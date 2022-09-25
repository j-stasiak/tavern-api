import { Server } from '@grpc/grpc-js';
import { ChatServer } from './modules/chat/chat-server';
import { TavernService } from './proto/game/tavern_grpc_pb';

console.log(typeof new ChatServer());

const server = new Server();
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
server.addService(TavernService, new ChatServer());

export { server as grpcServer };
