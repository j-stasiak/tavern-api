import { ITavernServer } from '../../proto/game/tavern_grpc_pb';
import { CreateChatMessage, ChatMessageId, LikeCount } from '../../proto/game/tavern_pb';
import grpc from '@grpc/grpc-js';
import { createChatMessage, increaseLikeCount } from './chat-service';

export class ChatServer implements ITavernServer {
  sendMessage: grpc.handleUnaryCall<CreateChatMessage, ChatMessageId> = async (call, callback) => {
    const message = call.request.getMessage();
    const userId = call.request.getUserid();

    const id = (await createChatMessage({ message, userId })).id;

    const chatMessageId = new ChatMessageId();
    chatMessageId.setId(id);
    callback(null, chatMessageId);
  };

  likeMessage: grpc.handleUnaryCall<ChatMessageId, LikeCount> = async (call, callback) => {
    const newLikeCount = await increaseLikeCount(call.request.getId());
    const likesCount = new LikeCount();
    likesCount.setCount(newLikeCount);
    callback(null, likesCount);
  };
}
