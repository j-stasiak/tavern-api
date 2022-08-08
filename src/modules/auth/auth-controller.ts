import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth-service';
import { CreateUserDto } from './dtos/create-user';
import { CredentialsDto } from './dtos/credentials';

export const register = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...registeredUser } = await registerUser(req.body as CreateUserDto);
  res.status(200).send(registeredUser);
};

export const login = async (req: Request, res: Response) => {
  try {
    const accessToken = await loginUser(req.body as CredentialsDto);
    if (!accessToken) {
      throw new Error('Invalid credentials!');
    }
    res.status(200).send({ access_token: accessToken });
  } catch (error) {
    res.status(500).send(error);
  }
};
