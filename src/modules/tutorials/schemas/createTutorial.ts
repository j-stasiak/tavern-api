import Joi from 'joi';

export const createTutorialStepsSchema: Joi.Schema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().required(),
  stepNumber: Joi.number().required(),
  isActive: Joi.boolean().optional().default(true)
});

export const createTutorialSchema: Joi.Schema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().required(),
  steps: Joi.array().items(createTutorialStepsSchema),
  isActive: Joi.boolean().optional().default(true)
});
