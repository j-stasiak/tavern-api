import { Repository, getRepository } from 'typeorm';
import { User, UserInfo } from './entities';

import { UpdateUserDto } from './dtos/update-user';

export const updateUser = async (id: string, updateUser: UpdateUserDto) => {
  const { info, ...userToUpdate } = updateUser;

  const userRepository: Repository<User> = getRepository(User);
  const result = await userRepository.update(id, userToUpdate);

  if (info) {
    const userInfoRepository: Repository<UserInfo> = getRepository(UserInfo);
    const userInfo = await userInfoRepository.findOneOrFail({ user: { id } });
    const userInfoToSave = Object.assign(userInfo, info);
    userInfoRepository.save(userInfoToSave);
  }

  return result;
};

export const getUserById = async (id: string) => {
  const userRepository: Repository<User> = getRepository(User);
  const tutorial = await userRepository.findOne(id, { relations: ['info', 'completedTutorials'] });

  return tutorial;
};

export const getUsers = async () => {
  const userRepository: Repository<User> = getRepository(User);
  const tutorials = await userRepository.find({ relations: ['info', 'completedTutorials'] });

  return tutorials;
};

export const removeUser = async (id: string) => {
  const userRepository: Repository<User> = getRepository(User);
  await userRepository.delete(id);
};
