import { Repository, getRepository } from 'typeorm';
import { User } from '../user/entities';
import { CreateChatMessageDto } from './dtos/create-message';
import { ChatMessage } from './entities';

export const createChatMessage = async (createChatMessage: CreateChatMessageDto) => {
  console.log('creating chat message', createChatMessage);
  const chatRepository: Repository<ChatMessage> = getRepository(ChatMessage);
  const userRepository: Repository<User> = getRepository(User);

  const chatMessage = chatRepository.create(createChatMessage);
  chatMessage.user = await userRepository.findOneOrFail(createChatMessage.userId);

  const createdChatMessage = chatRepository.save(chatMessage);

  return createdChatMessage;
};

export const increaseLikeCount = async (messageId: string) => {
  const chatRepository: Repository<ChatMessage> = getRepository(ChatMessage);
  await chatRepository.increment({ id: messageId }, 'likeCount', 1);
  const messageLikeCount = (await chatRepository.findOneOrFail(messageId)).likeCount;
  return messageLikeCount;
};

export const getAllChatMessages = async () => {
  const chatRepository: Repository<ChatMessage> = getRepository(ChatMessage);
  const tutorials = await chatRepository.find();

  return tutorials;
};

export const removeChatMessage = async (id: string) => {
  const chatRepository: Repository<ChatMessage> = getRepository(ChatMessage);
  await chatRepository.softDelete(id);
};

export const getChatHistoryForUser = async (userId: string) => {
  const chatRepository: Repository<ChatMessage> = getRepository(ChatMessage);
  const tutorials = await chatRepository.find({
    relations: ['user'],
    where: {
      user: {
        id: userId
      }
    }
  });

  return tutorials;
};
