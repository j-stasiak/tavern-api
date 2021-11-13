import Joi from 'joi';

export const createUserSchema: Joi.Schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required()
});
