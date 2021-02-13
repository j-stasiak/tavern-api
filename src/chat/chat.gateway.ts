import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) { }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    this.server.emit('message:client', payload);
  }

  @SubscribeMessage('connect')
  handleConnection(client: Socket, payload: any) {
    this.server.emit('user:connected', payload);
  }

  @SubscribeMessage('disconnect')
  handleDisconnect(client: Socket, payload: any) {
    this.server.emit('user:disconnected', payload);
  }
}
