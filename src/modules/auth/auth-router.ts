import express from 'express';
import { validate } from '../../middleware/request-validator';
import { login, register } from './auth-controller';
import { createUserSchema, credentialsSchema } from './schemas';

const router = express.Router();

router.post('/register', validate(createUserSchema), register);
router.post('/login', validate(credentialsSchema), login);

export { router };
