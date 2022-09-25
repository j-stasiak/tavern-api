// package: 
// file: game/tavern.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as game_tavern_pb from "../game/tavern_pb";

interface ITavernService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendMessage: ITavernService_ISendMessage;
    likeMessage: ITavernService_ILikeMessage;
}

interface ITavernService_ISendMessage extends grpc.MethodDefinition<game_tavern_pb.CreateChatMessage, game_tavern_pb.ChatMessageId> {
    path: "/Tavern/SendMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<game_tavern_pb.CreateChatMessage>;
    requestDeserialize: grpc.deserialize<game_tavern_pb.CreateChatMessage>;
    responseSerialize: grpc.serialize<game_tavern_pb.ChatMessageId>;
    responseDeserialize: grpc.deserialize<game_tavern_pb.ChatMessageId>;
}
interface ITavernService_ILikeMessage extends grpc.MethodDefinition<game_tavern_pb.ChatMessageId, game_tavern_pb.LikeCount> {
    path: "/Tavern/LikeMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<game_tavern_pb.ChatMessageId>;
    requestDeserialize: grpc.deserialize<game_tavern_pb.ChatMessageId>;
    responseSerialize: grpc.serialize<game_tavern_pb.LikeCount>;
    responseDeserialize: grpc.deserialize<game_tavern_pb.LikeCount>;
}

export const TavernService: ITavernService;

export interface ITavernServer {
    sendMessage: grpc.handleUnaryCall<game_tavern_pb.CreateChatMessage, game_tavern_pb.ChatMessageId>;
    likeMessage: grpc.handleUnaryCall<game_tavern_pb.ChatMessageId, game_tavern_pb.LikeCount>;
}

export interface ITavernClient {
    sendMessage(request: game_tavern_pb.CreateChatMessage, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    sendMessage(request: game_tavern_pb.CreateChatMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    sendMessage(request: game_tavern_pb.CreateChatMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    likeMessage(request: game_tavern_pb.ChatMessageId, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
    likeMessage(request: game_tavern_pb.ChatMessageId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
    likeMessage(request: game_tavern_pb.ChatMessageId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
}

export class TavernClient extends grpc.Client implements ITavernClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sendMessage(request: game_tavern_pb.CreateChatMessage, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    public sendMessage(request: game_tavern_pb.CreateChatMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    public sendMessage(request: game_tavern_pb.CreateChatMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.ChatMessageId) => void): grpc.ClientUnaryCall;
    public likeMessage(request: game_tavern_pb.ChatMessageId, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
    public likeMessage(request: game_tavern_pb.ChatMessageId, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
    public likeMessage(request: game_tavern_pb.ChatMessageId, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_tavern_pb.LikeCount) => void): grpc.ClientUnaryCall;
}
