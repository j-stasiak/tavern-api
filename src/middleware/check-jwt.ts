import type { NextFunction, Request, Response } from 'express';

import { User } from '../modules/user/entities';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';

export const checkJwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ').at(1);
  jwt.verify(token ?? '', process.env.JWT_SECRET!, (err, jwt) => {
    if (err) {
      res.status(403).send(err);
      return;
    }
    getConnection()
      .getRepository(User)
      .findOneOrFail(jwt!.sub)
      .then((user) => {
        req.user = user;
        next();
      });
  });
};

export const checkJwt = (token: string | undefined): boolean => {
  try {
    jwt.verify(token!, process.env.JWT_SECRET!);
  } catch (err: unknown) {
    return false;
  }
  return true;
};
