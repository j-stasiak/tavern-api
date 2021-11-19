import Joi from 'joi';

export const createUserSchema: Joi.Schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).max(80).required(),
  email: Joi.string().email().required()
});

export const credentialsSchema: Joi.Schema = Joi.object({
  username: Joi.string().alphanum().allow('_'),
  password: Joi.string().required(),
  email: Joi.string().email()
}).or('username', 'email');
