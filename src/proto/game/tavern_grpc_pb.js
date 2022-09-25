// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var game_tavern_pb = require('../game/tavern_pb.js');

function serialize_ChatMessageId(arg) {
  if (!(arg instanceof game_tavern_pb.ChatMessageId)) {
    throw new Error('Expected argument of type ChatMessageId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ChatMessageId(buffer_arg) {
  return game_tavern_pb.ChatMessageId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateChatMessage(arg) {
  if (!(arg instanceof game_tavern_pb.CreateChatMessage)) {
    throw new Error('Expected argument of type CreateChatMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateChatMessage(buffer_arg) {
  return game_tavern_pb.CreateChatMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_LikeCount(arg) {
  if (!(arg instanceof game_tavern_pb.LikeCount)) {
    throw new Error('Expected argument of type LikeCount');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_LikeCount(buffer_arg) {
  return game_tavern_pb.LikeCount.deserializeBinary(new Uint8Array(buffer_arg));
}


var TavernService = exports.TavernService = {
  sendMessage: {
    path: '/Tavern/SendMessage',
    requestStream: false,
    responseStream: false,
    requestType: game_tavern_pb.CreateChatMessage,
    responseType: game_tavern_pb.ChatMessageId,
    requestSerialize: serialize_CreateChatMessage,
    requestDeserialize: deserialize_CreateChatMessage,
    responseSerialize: serialize_ChatMessageId,
    responseDeserialize: deserialize_ChatMessageId,
  },
  likeMessage: {
    path: '/Tavern/LikeMessage',
    requestStream: false,
    responseStream: false,
    requestType: game_tavern_pb.ChatMessageId,
    responseType: game_tavern_pb.LikeCount,
    requestSerialize: serialize_ChatMessageId,
    requestDeserialize: deserialize_ChatMessageId,
    responseSerialize: serialize_LikeCount,
    responseDeserialize: deserialize_LikeCount,
  },
};

exports.TavernClient = grpc.makeGenericClientConstructor(TavernService);
