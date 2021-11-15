import { Request, Response } from 'express';
import { loginUser, registerUser } from './auth-service';
import { CreateUser } from './dtos/create-user';
import { Credentials } from './dtos/credentials';

export const register = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...registeredUser } = await registerUser(req.body as CreateUser);
  res.status(200).send(registeredUser);
};

export const login = async (req: Request, res: Response) => {
  try {
    const accessToken = await loginUser(req.body as Credentials);
    res.status(200).send({ access_token: accessToken });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};
