import { Repository, getRepository } from 'typeorm';
import { User, UserInfo } from '../user/entities';

import { CreateUserDto } from './dtos/create-user';
import { CredentialsDto } from './dtos/credentials';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = (user: CreateUserDto): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  const userInfoRepository: Repository<UserInfo> = getRepository(UserInfo);
  const infoEntity = userInfoRepository.create();
  const userEntity = userRepository.create({ ...user, info: infoEntity });
  return userRepository.save(userEntity);
};

export const loginUser = async (creds: CredentialsDto): Promise<string | undefined> => {
  const userRepository: Repository<User> = getRepository(User);
  const user =
    creds.username !== undefined
      ? await userRepository.findOneOrFail({ username: creds.username }, { relations: ['info', 'completedTutorials'] })
      : await userRepository.findOneOrFail({ email: creds.email }, { relations: ['info', 'completedTutorials'] });
  if (await bcrypt.compare(creds.password, user.password)) {
    return jwt.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        info: user.info,
        completedTutorials: user.completedTutorials,
        role: user.role,
        iat: Date.now()
      },
      process.env.JWT_SECRET!
    );
  }
  return undefined;
};
