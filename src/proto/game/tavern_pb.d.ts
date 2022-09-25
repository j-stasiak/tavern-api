// package: 
// file: game/tavern.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CreateChatMessage extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): CreateChatMessage;
    getMessage(): string;
    setMessage(value: string): CreateChatMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateChatMessage.AsObject;
    static toObject(includeInstance: boolean, msg: CreateChatMessage): CreateChatMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateChatMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateChatMessage;
    static deserializeBinaryFromReader(message: CreateChatMessage, reader: jspb.BinaryReader): CreateChatMessage;
}

export namespace CreateChatMessage {
    export type AsObject = {
        userid: string,
        message: string,
    }
}

export class ChatMessageId extends jspb.Message { 
    getId(): string;
    setId(value: string): ChatMessageId;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChatMessageId.AsObject;
    static toObject(includeInstance: boolean, msg: ChatMessageId): ChatMessageId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChatMessageId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChatMessageId;
    static deserializeBinaryFromReader(message: ChatMessageId, reader: jspb.BinaryReader): ChatMessageId;
}

export namespace ChatMessageId {
    export type AsObject = {
        id: string,
    }
}

export class LikeCount extends jspb.Message { 
    getCount(): number;
    setCount(value: number): LikeCount;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LikeCount.AsObject;
    static toObject(includeInstance: boolean, msg: LikeCount): LikeCount.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LikeCount, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LikeCount;
    static deserializeBinaryFromReader(message: LikeCount, reader: jspb.BinaryReader): LikeCount;
}

export namespace LikeCount {
    export type AsObject = {
        count: number,
    }
}
