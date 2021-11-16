import { Repository, getRepository } from 'typeorm';
import { User } from '../user/entities';
import { CreateUser } from './dtos/create-user';
import { Credentials } from './dtos/credentials';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (user: CreateUser): Promise<User> => {
  const userRepository: Repository<User> = getRepository(User);
  const userEntity = userRepository.create(user);
  return await userRepository.save(userEntity);
};

export const loginUser = async (
  creds: Credentials
): Promise<string | undefined> => {
  const userRepository: Repository<User> = getRepository(User);
  const user =
    creds.username !== undefined
      ? await userRepository.findOneOrFail({ username: creds.username })
      : await userRepository.findOneOrFail({ email: creds.email });
  if (await bcrypt.compare(creds.password, user.password)) {
    return jwt.sign(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        iat: Date.now()
      },
      process.env.JWT_SECRET!
    );
  }
  return undefined;
};
