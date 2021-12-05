import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { User } from '../modules/user/entities';

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err, jwt) => {
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
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    });
  } else {
    res.sendStatus(401);
  }
};
