import Joi from 'joi';

export const messageSchema = Joi.object({
  message: Joi.string().required().truncate(),
  type: Joi.string().valid('message', 'alert', 'announcement').required()
});
