import Joi from 'joi';

export const getTutorialSchema: Joi.Schema = Joi.object({
  id: Joi.string().required()
});
