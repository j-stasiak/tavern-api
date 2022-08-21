import { NextFunction, Request, Response } from 'express';

import Joi from 'joi';

export const validate = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).send({ error: error.name, details: error.details });
      return;
    }
    next();
  };
};

export const validateParams = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).send({ error: error.name, details: error.details });
      return;
    }
    next();
  };
};
