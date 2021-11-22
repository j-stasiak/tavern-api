import express from 'express';
import { validateHttpRequest } from '../../../middleware/request-validator';
import { login, register } from './auth-controller';
import { createUserSchema, credentialsSchema } from './schemas';

const router = express.Router();

router.post('/register', validateHttpRequest(createUserSchema), register);
router.post('/login', validateHttpRequest(credentialsSchema), login);

export { router };
