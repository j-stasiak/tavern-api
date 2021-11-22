import Joi, { ValidationError } from 'joi';

export const validatePayload = (schema: Joi.Schema, payload: any) => {
  const { error } = schema.validate(payload);
  if (error) {
    throw error;
  }
};
